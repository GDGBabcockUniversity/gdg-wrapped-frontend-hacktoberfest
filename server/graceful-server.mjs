#!/usr/bin/env node

import http from "http";
import { parse } from "url";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const gracePeriodMs = parseInt(process.env.GRACE_PERIOD || "1000", 10);

const app = next({ dev });
const handler = app.getRequestHandler();

let isDraining = false;
const sockets = new Set();

function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[graceful][${timestamp}] ${message}`);
}

async function main() {
  await app.prepare();

  const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true);

    if (parsedUrl.pathname === "/_health") {
      res.statusCode = isDraining ? 503 : 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          status: isDraining ? "draining" : "ok",
          timestamp: new Date().toISOString(),
        }),
      );
      return;
    }

    if (parsedUrl.pathname === "/_demo/sleep") {
      if (!dev && process.env.ENABLE_GRACEFUL_DEMO !== "true") {
        res.statusCode = 404;
        res.end("Not available");
        return;
      }

      const delay = Math.max(
        0,
        Math.min(parseInt(parsedUrl.query.ms ?? "200", 10) || 0, 5000),
      );
      setTimeout(() => {
        if (!res.headersSent) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
        }
        res.end(
          JSON.stringify({
            ok: true,
            delay,
            drained: isDraining,
            timestamp: new Date().toISOString(),
          }),
        );
      }, delay);
      return;
    }

    if (isDraining) {
      res.statusCode = 503;
      res.setHeader("Connection", "close");
      res.end("Server is draining connections");
      return;
    }

    handler(req, res, parsedUrl);
  });

  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
  });

  function initiateShutdown(signal) {
    if (isDraining) {
      return;
    }
    isDraining = true;
    log(`Received ${signal}. Entering drain mode.`);

    server.close(() => {
      log("HTTP server closed. Exiting cleanly.");
      process.exit(0);
    });

    setTimeout(() => {
      log("Grace period elapsed; destroying remaining sockets.");
      for (const socket of sockets) {
        try {
          socket.destroy();
        } catch (error) {
          log(`Failed to destroy socket: ${error}`);
        }
      }
    }, gracePeriodMs).unref();
  }

  process.once("SIGTERM", () => initiateShutdown("SIGTERM"));
  process.once("SIGINT", () => initiateShutdown("SIGINT"));

  server.listen(port, () => {
    log(`Listening on http://127.0.0.1:${port} (grace ${gracePeriodMs}ms)`);
  });
}

main().catch((error) => {
  console.error("[graceful] Failed to start server:", error);
  process.exit(1);
});

import { NextRequest, NextResponse } from "next/server";
import manifest from "./src/generated/asset-manifest.json";

type ManifestEntry = {
  path: string;
};

const assetManifest = manifest as Record<string, ManifestEntry>;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets-fingerprint")
  ) {
    return NextResponse.next();
  }

  const entry = assetManifest[pathname as keyof typeof assetManifest];
  if (entry?.path) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = entry.path;
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

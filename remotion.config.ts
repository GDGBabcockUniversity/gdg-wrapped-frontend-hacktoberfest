import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind";
import path from "path";

Config.overrideWebpackConfig((currentConfig) => {
  return enableTailwind({
    ...currentConfig,
    resolve: {
      ...currentConfig.resolve,
      alias: {
        ...(currentConfig.resolve?.alias ?? {}),
        "@": path.join(process.cwd(), "src"),
      },
    },
  });
});

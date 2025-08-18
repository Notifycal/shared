import fs from 'node:fs';
import path from 'path';
import type { Plugin } from 'vite';

export function ourServiceConfigPlugin(dirname: string): Plugin {
  const pluginName = 'service-config-handler';
  const configLocalPath = path.resolve(dirname, 'config/config.local.js');
  const configSkelPath = path.resolve(dirname, 'config/config.skel.js');

  return {
    name: pluginName,
    configureServer: (server): void => {
      // Only runs for the dev server
      console.log(`[${pluginName}] Serving local config.js...`);
      server.middlewares.use('/config.js', (_req, res) => {
        const content = fs.readFileSync(configLocalPath, 'utf-8');
        res.setHeader('Content-Type', 'application/javascript');
        res.statusCode = 200;
        res.end(content);
      });
    },
    generateBundle(): void {
      // Only runs for the prod build
      console.log(`[${pluginName}] Bundling config.skel.js...`);
      const content = fs.readFileSync(configSkelPath, 'utf-8');
      this.emitFile({
        type: 'asset',
        fileName: 'config.skel.js',
        source: content
      });
      console.log(`[${pluginName}] Emitted config.skel.js to bundle.`);
    }
  };
}

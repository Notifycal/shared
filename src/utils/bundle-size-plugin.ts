import type { OutputBundle } from 'rollup';
import type { Plugin } from 'vite';

function bytesToMB(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(2);
}

export function bundleSizePlugin(maxBundleChunkSizeInBytes: number, maxTotalBundleSizeInBytes: number): Plugin {
  const pluginName = 'bundle-size-limit';
  return {
    name: pluginName,
    generateBundle(_options, bundle: OutputBundle): void {
      console.log(`[${pluginName}] Checking bundle size limits...`);
      let totalSize = 0;
      for (const [fileName, chunk] of Object.entries(bundle)) {
        let size = 0;
        if (chunk.type === 'chunk' && chunk.code) {
          size = Buffer.byteLength(chunk.code, 'utf8');
          if (size > maxBundleChunkSizeInBytes) {
            throw new Error(
              `Chunk ${fileName} ${bytesToMB(size)}MB exceeds the chunk size limit of ${bytesToMB(maxBundleChunkSizeInBytes)}MB`
            );
          }
        } else if (chunk.type === 'asset' && chunk.source) {
          size = Buffer.isBuffer(chunk.source) ? chunk.source.length : Buffer.byteLength(chunk.source, 'utf8');
        }
        totalSize += size;
      }
      const totalSizeInMB = bytesToMB(totalSize);
      console.log(`Total bundle size: ${totalSizeInMB}MB`);
      if (totalSize > maxTotalBundleSizeInBytes) {
        throw new Error(
          `Total bundle size ${totalSizeInMB}MB exceeds the total bundle size limit of ${bytesToMB(maxTotalBundleSizeInBytes)}MB`
        );
      }
    }
  };
}

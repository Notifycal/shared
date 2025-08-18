import type { ZodType } from 'zod';

declare global {
  interface Window {
    globalConfig?: unknown;
  }
}

interface ServiceConfigFactory<T> {
  loadServiceConfig: () => void;
  getServiceConfig: () => T;
}

export function createServiceConfig<T>(schema: ZodType<T>): ServiceConfigFactory<T> {
  let config: T | null = null;

  const loadServiceConfig = (): void => {
    if (config) return;

    const raw = window.globalConfig;

    if (!raw) {
      throw new Error('Service configuration is missing');
    }

    try {
      config = schema.parse(raw);
    } catch {
      throw new Error('Invalid service configuration');
    }
  };

  const getServiceConfig = (): T => {
    if (!config) {
      throw new Error('Service config not loaded.');
    }

    return config;
  };

  return {
    loadServiceConfig,
    getServiceConfig
  };
}

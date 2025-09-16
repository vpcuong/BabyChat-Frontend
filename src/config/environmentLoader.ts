class EnvironmentLoader {
  private static loadedConfig: any = null;

  static loadConfig() {
    if (this.loadedConfig) {
      return this.loadedConfig;
    }

    const env = import.meta.env.VITE_NODE_ENV;
    
    // Different configs for different environments
    const configs = {
      development: {
        apiUrl: import.meta.env.VITE_DEV_API_URL,
        features: {
          debugPanel: true,
          mockData: true,
          hotReload: true,
        }
      },
      staging: {
        apiUrl: import.meta.env.VITE_STAGING_API_URL,
        features: {
          debugPanel: true,
          mockData: false,
          hotReload: false,
        }
      },
      production: {
        apiUrl: import.meta.env.VITE_PROD_API_URL,
        features: {
          debugPanel: false,
          mockData: false,
          hotReload: false,
        }
      }
    };

    const config = configs[env as keyof typeof configs] || configs.development;
    this.loadedConfig = config;
    
    return config;
  }
}

export default EnvironmentLoader;
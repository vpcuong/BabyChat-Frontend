class EnvironmentLoader {
  private static loadedConfig: any = null;

  static loadConfig() {
    if (this.loadedConfig) {
      return this.loadedConfig;
    }

    const env = process.env.NODE_ENV;
    
    // Different configs for different environments
    const configs = {
      development: {
        apiUrl: process.env.REACT_APP_DEV_API_URL || 'http://localhost:3001',
        features: {
          debugPanel: true,
          mockData: true,
          hotReload: true,
        }
      },
      staging: {
        apiUrl: process.env.REACT_APP_STAGING_API_URL,
        features: {
          debugPanel: true,
          mockData: false,
          hotReload: false,
        }
      },
      production: {
        apiUrl: process.env.REACT_APP_PROD_API_URL,
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
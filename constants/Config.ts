export type AppEnvironment = 'dev' | 'qa' | 'stage' | 'prod';

export const Config = {
  environment: process.env.EXPO_PUBLIC_ENVIRONMENT as AppEnvironment,
  baseUrls: {
    dev: process.env.EXPO_PUBLIC_DEV_BASE_URL_API,
    qa: process.env.EXPO_PUBLIC_QA_BASE_URL_API,
    stage: process.env.EXPO_PUBLIC_STAGE_BASE_URL_API,
    prod: process.env.EXPO_PUBLIC_PROD_BASE_URL_API,
  },
  openInDebug: {
    dev: process.env.EXPO_PUBLIC_DEV_OPEN_IN_DEBUG_MODE === 'true',
    qa: process.env.EXPO_PUBLIC_QA_OPEN_IN_DEBUG_MODE === 'true',
    stage: process.env.EXPO_PUBLIC_STAGE_OPEN_IN_DEBUG_MODE === 'true',
    prod: process.env.EXPO_PUBLIC_PROD_OPEN_IN_DEBUG_MODE === 'true',
  }
} as const;

export const DEBUG_MODE = Config.openInDebug[Config.environment]
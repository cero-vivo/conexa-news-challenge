export type AppEnvironment = 'dev' | 'qa' | 'stage' | 'prod';

console.log(" process.env.EXPO_PUBLIC_DEV_BASE_URL_API", process.env.EXPO_PUBLIC_DEV_BASE_URL_API)

export const Config = {
  environment: process.env.EXPO_PUBLIC_ENVIRONMENT as AppEnvironment,
  baseUrls: {
    dev: process.env.EXPO_PUBLIC_DEV_BASE_URL_API,
    qa: process.env.EXPO_PUBLIC_QA_BASE_URL_API,
    stage: process.env.EXPO_PUBLIC_STAGE_BASE_URL_API,
    prod: process.env.EXPO_PUBLIC_PROD_BASE_URL_API,
  }
} as const;
/**
 * Centralized routes for the application
 * This ensures type safety and prevents hardcoded route strings
 */

export const Routes = {
  // Main navigation
  INDEX: '/',
  ONBOARDING: '/onboarding',
  AUTH: '/auth',
  TABS: '/(tabs)',
  
  // Tab screens - these should match the actual file names
  NEWS_FEED: '/(tabs)',
  USERS_FEED: '/(tabs)/explore',
  SAVED_NEWS: '/(tabs)/saved-news',
  PROFILE: '/(tabs)/profile',
  
  // Modal screens
  NEWS_DETAIL: '/news-detail',
  USER_DETAIL: '/user-detail',
  
  // Error screens
  NOT_FOUND: '/+not-found',
} as const;

// Type for route values
export type RouteType = typeof Routes[keyof typeof Routes];

// Helper function to ensure route exists
export const getRoute = (route: RouteType): string => route;

// Route groups for better organization
export const TabRoutes = {
  NEWS: Routes.NEWS_FEED,
  USERS: Routes.USERS_FEED,
  SAVED: Routes.SAVED_NEWS,
} as const;

export const ModalRoutes = {
  NEWS_DETAIL: Routes.NEWS_DETAIL,
  USER_DETAIL: Routes.USER_DETAIL,
} as const;

export const MainRoutes = {
  INDEX: Routes.INDEX,
  ONBOARDING: Routes.ONBOARDING,
  TABS: Routes.TABS,
} as const; 
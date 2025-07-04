export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isAnonymous: boolean;
  createdAt: string;
} 
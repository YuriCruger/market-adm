export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
  photoURL?: string;
  isAnonymous: boolean;
  providerData: {
    providerId: string;
    uid: string;
    displayName?: string;
    email: string;
    phoneNumber?: string | null;
    photoURL?: string | null;
  }[];
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

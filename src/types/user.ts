export interface User {
  id: string;
  anonymousNickname: string;
  agreedToTerms: boolean;
  agreedAt?: string;
  createdAt: string;
  lettersSent: number;
  lettersReceived: number;
  lettersReplied: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface OnboardingState {
  hasCompletedOnboarding: boolean;
  hasAgreedToTerms: boolean;
  anonymousNickname: string;
}

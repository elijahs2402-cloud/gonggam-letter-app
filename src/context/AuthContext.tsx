import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { User, AuthState } from "../types/user";
import { mockUser } from "../data/mockUser";

interface AuthContextValue extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setNickname: (nickname: string) => void;
  agreeToTerms: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback((user: User) => {
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setAuthState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  }, []);

  const setNickname = useCallback(
    (nickname: string) => {
      const newUser: User = {
        ...mockUser,
        anonymousNickname: nickname,
      };
      login(newUser);
    },
    [login]
  );

  const agreeToTerms = useCallback(() => {
    updateUser({
      agreedToTerms: true,
      agreedAt: new Date().toISOString(),
    });
  }, [updateUser]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateUser,
        setNickname,
        agreeToTerms,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

import { createContext, PropsWithChildren, use, useCallback } from "react";
import { useStorageState } from "@/session/useStorageState";

interface SessionData {
  email: string;
  password: string;
}

interface AuthContextType {
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  session: SessionData | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useSession(): AuthContextType {
  const value = use(AuthContext);

  if (!value) {
    throw new Error("Use session must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, sessionString], setSessionString] =
    useStorageState("session");
  const session = sessionString ? JSON.parse(sessionString) : null;

  const signup = useCallback(
    (email: string, password: string) => {
      const userSession = JSON.stringify({ email, password });
      setSessionString(userSession);
    },
    [setSessionString],
  );

  const login = useCallback(
    (email: string, password: string) => {
      const userSession = JSON.stringify({ email, password });
      setSessionString(userSession);
    },
    [setSessionString],
  );

  const logout = useCallback(() => {
    setSessionString(null);
  }, [setSessionString]);

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

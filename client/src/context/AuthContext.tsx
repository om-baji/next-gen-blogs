import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const AuthContext = createContext({ isLoaded: false, isSignedIn: false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const [authState, setAuthState] = useState({ isLoaded: false, isSignedIn: false });

  useEffect(() => {
    if (isLoaded) {
      setAuthState({ isLoaded, isSignedIn });
    }
  }, [isLoaded, isSignedIn]);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}

export function useAuthStatus() {
  return useContext(AuthContext);
}

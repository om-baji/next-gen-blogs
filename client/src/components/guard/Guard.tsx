import { useAuthStatus } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export function Guard({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
      toast({
        title : "Protected Route",
        description : "Sign-in to access"
      })
    }
  }, [isLoaded, isSignedIn, navigate]);


  if (!isSignedIn) {
    return null;
  }

  return <>{children}</>;
}

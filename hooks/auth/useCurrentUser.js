import { useEffect, useState } from "react";
import { authService } from "../../services";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getUser();
    if (currentUser) {
      setUser(currentUser)
    }
  }, []);

  return { user };
};
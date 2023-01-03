import { authService } from "../../services";

export const useLogout = () => {
    const logout = async () => {
        return await authService.logout();
    };

  return { logout };
};
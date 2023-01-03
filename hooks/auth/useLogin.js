import { authService } from "../../services";

export const useLogin = () => {
  const login = async (username, password) => {
    return await authService.login(username, password);
  };

  return { login };
};
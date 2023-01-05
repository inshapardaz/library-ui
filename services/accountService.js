import axios from 'axios';
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/accounts`;

class AccountService {
    register(code, params) {
        return axios.post(`${baseUrl}/register/${code}`, params);
      }
    
      verifyInvite(code) {
        return axios.getRaw(`${baseUrl}/invitation/${code}`)
          .then((r) => {
            if (r.status !== 200) {
              return Promise.reject(r);
            }
    
            return r;
          });
      }
    
      forgotPassword(email) {
        return axios.post(`${baseUrl}/forgot-password`, { email });
      }
    
      validateResetToken(token) {
        return axios.post(`${baseUrl}/validate-reset-token`, { token });
      }
    
      resetPassword({ code, password, confirmPassword }) {
        return axios.post(`${baseUrl}/reset-password`, { token: code, password, confirmPassword });
      }
    
      changePassword(oldPassword, password) {
        return axios.post(`${baseUrl}/change-password`, { oldPassword, password });
      }
}

export default new AccountService();
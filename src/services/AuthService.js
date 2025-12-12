import api from './api';

class AuthService {
  async login(loginRequest) {
    const response = await api.post('/auth/login', loginRequest);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  async getCurrentUser() {
    return api.get('/auth/me');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getStoredToken() {
    return localStorage.getItem('token');
  }

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!this.getStoredToken();
  }
}

export default new AuthService();

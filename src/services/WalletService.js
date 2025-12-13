import api from './api';

class WalletService {
  async createWallet(wallet) {
    return api.post('/wallets', wallet);
  }

  async getWalletById(id) {
    return api.get(`/wallets/${id}`);
  }

  async getWalletsByUserId(userId) {
    return api.get(`/wallets/user/${userId}`);
  }

  async getPrimaryWalletByUserId(userId) {
    return api.get(`/wallets/user/${userId}/primary`);
  }

  async updateWallet(id, wallet) {
    return api.put(`/wallets/${id}`, wallet);
  }

  async deleteWallet(id) {
    return api.delete(`/wallets/${id}`);
  }
}

export default new WalletService();

import api from './api';

class StoreService {
  async createStore(createStoreRequest) {
    return api.post('/stores', createStoreRequest);
  }

  async getStoreById(id) {
    return api.get(`/stores/${id}`);
  }

  async getStoreBySlug(slug) {
    return api.get(`/stores/slug/${slug}`);
  }

  async getStoresByTenantId(tenantId, page = 0, size = 10) {
    return api.get(`/stores/tenant/${tenantId}`, {
      params: { page, size }
    });
  }

  async updateStore(id, updateStoreRequest) {
    return api.put(`/stores/${id}`, updateStoreRequest);
  }

  async deleteStore(id) {
    return api.delete(`/stores/${id}`);
  }
}

export default new StoreService();

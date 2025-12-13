import api from './api';

class TenantService {
  async createTenant(tenant) {
    return api.post('/tenants', tenant);
  }

  async getTenantById(id) {
    return api.get(`/tenants/${id}`);
  }

  async updateTenant(id, tenant) {
    return api.put(`/tenants/${id}`, tenant);
  }

  async deleteTenant(id) {
    return api.delete(`/tenants/${id}`);
  }
}

export default new TenantService();

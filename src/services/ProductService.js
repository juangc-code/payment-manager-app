import api from './api';

class ProductService {
  async createProduct(createProductRequest) {
    return api.post('/products', createProductRequest);
  }

  async getProductById(id) {
    return api.get(`/products/${id}`);
  }

  async getProductBySku(sku) {
    return api.get(`/products/sku/${sku}`);
  }

  async getProductsByStoreId(storeId, page = 0, size = 10) {
    return api.get(`/products/store/${storeId}`, {
      params: { page, size }
    });
  }

  async getActiveProductsByStoreId(storeId, page = 0, size = 10) {
    return api.get(`/products/store/${storeId}/active`, {
      params: { page, size }
    });
  }

  async getFeaturedProductsByStoreId(storeId, page = 0, size = 10) {
    return api.get(`/products/store/${storeId}/featured`, {
      params: { page, size }
    });
  }

  async updateProduct(id, updateProductRequest) {
    return api.put(`/products/${id}`, updateProductRequest);
  }

  async deleteProduct(id) {
    return api.delete(`/products/${id}`);
  }
}

export default new ProductService();

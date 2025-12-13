import api from './api';

class OrderService {
  async createOrder(createOrderRequest) {
    return api.post('/orders', createOrderRequest);
  }

  async getOrderById(id) {
    return api.get(`/orders/${id}`);
  }

  async getOrderByOrderNumber(orderNumber) {
    return api.get(`/orders/number/${orderNumber}`);
  }

  async getOrdersByStoreId(storeId, page = 0, size = 10) {
    return api.get(`/orders/store/${storeId}`, {
      params: { page, size }
    });
  }

  async getOrdersByCustomerId(customerId, page = 0, size = 10) {
    return api.get(`/orders/customer/${customerId}`, {
      params: { page, size }
    });
  }

  async updateOrderStatus(id, status) {
    return api.patch(`/orders/${id}/status`, null, {
      params: { status }
    });
  }

  async cancelOrder(id) {
    return api.post(`/orders/${id}/cancel`);
  }
}

export default new OrderService();

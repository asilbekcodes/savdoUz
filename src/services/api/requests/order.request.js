import request from "../request";

function httpGetOrders(page, page_size, filters) {
  return request.get(
    `/api/leads/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetOrder() {
  return request.get(`/api/leads/`);
}

function httpGetOrderOne(id) {
  return request.get(`/api/leads/${id}/`);
}

function httpPostOrder(data) {
  return request.post(`/api/leads/`, data, {
  });
}

function httpUpdateOrder({ id, data }) {
  return request.put(`/api/leads/${id}/`, data);
}

function httpDeleteOrder(id) {
  return request.delete(`/api/leads/${id}/`);
}

function httpTotalProducts() {
  return request.get(`/api/leads/filter_leads/`)
}

function httpAddPaymentOrder(data) {
  return request.post(`/api/trade_payments/`, data);
}

function httpDeletePaymentOrder(id) {
  return request.delete(`/api/trade_payments/${id}/`);
}

export {
  httpAddPaymentOrder,
  httpDeletePaymentOrder,
  httpDeleteOrder,
  httpGetOrderOne,
  httpGetOrders,
  httpPostOrder,
  httpUpdateOrder,
  httpGetOrder,
  httpTotalProducts
};

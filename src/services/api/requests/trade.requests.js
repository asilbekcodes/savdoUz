import request from "../request";

function httpGetTrades(page, page_size, filters) {
  return request.get(
    `/api/trades/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetTradeOne(id) {
  return request.get(`/api/trades/${id}/`);
}

function httpPostTrade(data) {
  return request.post(`/api/trades/`, data);
}

function httpUpdateTrade({ id, data }) {
  return request.put(`/api/trades/${id}/`, data);
}

function httpDeleteTrade(id) {
  return request.delete(`/api/trades/${id}/`);
}

function httpAddPaymentTrade(data) {
  return request.post(`/api/trade_payments/`, data);
}

function httpDeletePaymentTrade(id) {
  return request.delete(`/api/trade_payments/${id}/`);
}

export {
  httpAddPaymentTrade,
  httpDeletePaymentTrade,
  httpDeleteTrade,
  httpGetTradeOne,
  httpGetTrades,
  httpPostTrade,
  httpUpdateTrade,
};

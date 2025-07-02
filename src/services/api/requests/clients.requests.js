import request from "../request";

function httpGetAllClients() {
  return request.get(`/api/all_clients/`);
}

function httpGetClients(page, page_size, filters) {
  return request.get(
    `/api/clients/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetClientOne(id) {
  return request.get(`/api/clients/${id}/`);
}

function httpImportClients(data) {
  return request.post(`/api/import_clients/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function httpPostClient(data) {
  return request.post(`/api/clients/`, data);
}

function httpUpdateClient({ id, data }) {
  return request.put(`/api/clients/${id}/`, data);
}

function httpAddPaymentClient(data) {
  return request.post(`/api/trade_payments/`, data);
}

function httpDeleteClient(id) {
  return request.delete(`/api/clients/${id}/`);
}

function httpSpecialClient(data) {
  return request.post(`/api/special_clients/`, data);
}

function httpDeleteBasketClient(id) {
  return request.delete(`/api/clients/${id}/permanent_delete/`);
}

function httpGetDeletedClients(page, page_size, filters) {
  return request.get(
    `/api/clients/deleted/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpRestoreClient(id) {
  return request.post(`/api/clients/${id}/restore/`);
}

export {
  httpAddPaymentClient,
  httpDeleteBasketClient,
  httpGetDeletedClients,
  httpRestoreClient,
  httpGetAllClients,
  httpGetClients,
  httpDeleteClient,
  httpUpdateClient,
  httpImportClients,
  httpPostClient,
  httpGetClientOne,
  httpSpecialClient,
};

import request from "../request";

function httpGetStorageProductsOff(page, page_size, filters) {
  return request.get(
    `/api/storage_products_off/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetStorageProductOffOne(id) {
  return request.get(`/api/storage_products_off/${id}/`);
}

function httpPostStorageProductOff(data) {
  return request.post(`/api/storage_products_off/`, data);
}

function httpUpdateStorageProductOff({ id, data }) {
  return request.put(`/api/storage_products_off/${id}/`, data);
}

function httpDeleteStorageProductOff(id) {
  return request.delete(`/api/storage_products_off/${id}/`);
}

export {
  httpDeleteStorageProductOff,
  httpGetStorageProductOffOne,
  httpGetStorageProductsOff,
  httpPostStorageProductOff,
  httpUpdateStorageProductOff,
};

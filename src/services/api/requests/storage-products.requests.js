import request from "../request";

function httpGetStorageProducts(page, page_size, filters) {
  return request.get(
    `/api/storage_products/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetStorageProductOne(id) {
  return request.get(`/api/storage_products/${id}/`);
}

function httpPostStorageProduct(data) {
  return request.post(`/api/storage_products/`, data);
}

function httpUpdateStorageProduct({ id, data }) {
  return request.put(`/api/storage_products/${id}/`, data);
}

function httpDeleteStorageProduct(id) {
  return request.delete(`/api/storage_products/${id}/`);
}

function httpAddPaymentStorageProduct(data) {
  return request.post(`/api/storage_product_payments/`, data);
}

function httpDeletePaymentStorageProduct(id) {
  return request.delete(`/api/storage_product_payments/${id}/`);
}

export {
  httpDeleteStorageProduct,
  httpUpdateStorageProduct,
  httpPostStorageProduct,
  httpGetStorageProductOne,
  httpGetStorageProducts,
  httpAddPaymentStorageProduct,
  httpDeletePaymentStorageProduct,
};

import request from "../request";

function httpGetAllProducts(filters) {
  return request.get(`/api/all_products/${filters && `?${filters}`}`);
}

function httpGetProducts(page, page_size, filters) {
  return request.get(
    `/api/products/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetProductOne(id) {
  return request.get(`/api/products/${id}/`);
}

function httpImportProducts(data) {
  return request.post(`/api/import_products/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function httpPostProduct(data) {
  return request.post(`/api/product_create/`, data);
}

function httpUpdateProduct({ id, data }) {
  return request.put(`/api/products/${id}/`, data);
}

function httpDeleteProduct(id) {
  return request.delete(`/api/products/${id}/`);
}

function httpDeleteBasketProduct(id) {
  return request.delete(`/api/products/${id}/permanent_delete/`);
}

function httpGetDeletedProducts(page, page_size, filters) {
  return request.get(
    `/api/products/deleted/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpRestoreProduct(id) {
  return request.post(`/api/products/${id}/restore/`);
}

export {
  httpDeleteBasketProduct,
  httpDeleteProduct,
  httpGetAllProducts,
  httpGetDeletedProducts,
  httpGetProductOne,
  httpGetProducts,
  httpImportProducts,
  httpPostProduct,
  httpRestoreProduct,
  httpUpdateProduct,
};

import request from "../request";

function httpGetAllProductCategories() {
  return request.get(`/api/all_categories/`);
}

function httpGetProductCategories(page, page_size, filters) {
  return request.get(
    `/api/categories/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpImportProductCategories(data) {
  return request.post(`/api/import_categories/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function httpGetProductCategoryOne(id) {
  return request.get(`/api/categories/${id}/`);
}

function httpPostProductCategory(data) {
  return request.post(`/api/categories/`, data);
}

function httpUpdateProductCategory({ id, data }) {
  return request.put(`/api/categories/${id}/`, data);
}

function httpDeleteProductCategory(id) {
  return request.delete(`/api/categories/${id}/`);
}

export {
  httpGetAllProductCategories,
  httpGetProductCategories,
  httpGetProductCategoryOne,
  httpPostProductCategory,
  httpUpdateProductCategory,
  httpDeleteProductCategory,
  httpImportProductCategories,
};

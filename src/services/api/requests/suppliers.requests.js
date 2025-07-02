import request from "../request";

function httpGetAllSuppliers() {
  return request.get(`/api/all_suppliers/`);
}

function httpGetSuppliers(page, page_size, filters) {
  return request.get(
    `/api/suppliers/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetSupplierOne(id) {
  return request.get(`/api/suppliers/${id}/`);
}

function httpImportSuppliers(data) {
  return request.post(`/api/import_suppliers/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function httpPostSupplier(data) {
  return request.post(`/api/suppliers/`, data);
}

function httpUpdateSupplier({ id, data }) {
  return request.put(`/api/suppliers/${id}/`, data);
}

function httpDeleteSupplier(id) {
  return request.delete(`/api/suppliers/${id}/`);
}

function httpAddPaymentSupplier(data) {
  return request.post(`/api/storage_product_payments/`, data);
}

function httpAddDebtSupplier(data) {
  return request.post(`/api/supplier_debts/`, data);
}

function httpDeleteDebtSupplier(id) {
  return request.delete(`/api/supplier_debts/${id}/`);
}

export {
  httpGetAllSuppliers,
  httpGetSuppliers,
  httpGetSupplierOne,
  httpImportSuppliers,
  httpPostSupplier,
  httpUpdateSupplier,
  httpDeleteSupplier,
  httpAddPaymentSupplier,
  httpAddDebtSupplier,
  httpDeleteDebtSupplier,
};

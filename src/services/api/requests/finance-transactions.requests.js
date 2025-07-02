import request from "../request";

function httpGetAllFinanceTrasanctions() {
  return request.get(`/api/all_transactions/`);
}

function httpGetFinanceTransactions(page, page_size, filters) {
  return request.get(
    `/api/transactions/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetFinanceTransactionOne(id) {
  return request.get(`/api/transactions/${id}/`);
}

function httpPostFinanceTransaction(data) {
  return request.post(`/api/transactions/`, data);
}

function httpUpdateFinanceTransaction({ id, data }) {
  return request.put(`/api/transactions/${id}/`, data);
}

function httpDeleteFinanceTransaction(id) {
  return request.delete(`/api/transactions/${id}/`);
}

export {
  httpGetAllFinanceTrasanctions,
  httpPostFinanceTransaction,
  httpUpdateFinanceTransaction,
  httpDeleteFinanceTransaction,
  httpGetFinanceTransactions,
  httpGetFinanceTransactionOne,
};

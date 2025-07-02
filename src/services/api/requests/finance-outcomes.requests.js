import request from "../request";

function httpGetAllFinanceOutcomes() {
  return request.get(`/api/finance_outcomes/`);
}

function httpGetFinanceOutcomes(page, page_size, filters) {
  return request.get(
    `/api/finance_outcomes/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetFinanceOutcomeOne(id) {
  return request.get(`/api/finance_outcomes/${id}/`);
}

function httpPostFinanceOutcome(data) {
  return request.post(`/api/finance_outcomes/`, data);
}

function httpUpdateFinanceOutcome({ id, data }) {
  return request.put(`/api/finance_outcomes/${id}/`, data);
}

function httpDeleteFinanceOutcome(id) {
  return request.delete(`/api/finance_outcomes/${id}/`);
}

export {
  httpDeleteFinanceOutcome,
  httpGetAllFinanceOutcomes,
  httpGetFinanceOutcomeOne,
  httpGetFinanceOutcomes,
  httpPostFinanceOutcome,
  httpUpdateFinanceOutcome,
};

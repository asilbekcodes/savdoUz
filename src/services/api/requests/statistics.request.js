import request from "../request";

// trade

function httpGetTradeStatisticsTotal() {
  return request.get(`/api/trade_statistics/`);
}

function httpGetTradeStatisticsDaily(date) {
  return request.get(`/api/daily_trade_statistics/?date=${date}`);
}

function httpGetTradeStatisticsMonthly(date) {
  return request.get(`/api/monthly_trade_statistics/?year_month=${date}`);
}

function httpGetTradeStatisticsYearly(date) {
  return request.get(`/api/yearly_trade_statistics/?year=${date}`);
}

// product

function httpGetProductStatisticsTotal() {
  return request.get(`/api/product_statistics/`);
}

function httpGetProductStatisticsMonthly({ date, productID }) {
  return request.get(
    `/api/monthly_product_statistics/?date=${date}&product=${productID}`
  );
}

function httpGetProductStatisticsYearly({ date, productID }) {
  return request.get(
    `/api/yearly_product_statistics/?date=${date}&product=${productID}`
  );
}

function httpGetProductStatisticsDaily({ date, productID }) {
  return request.get(
    `/api/daily_product_statistics/?date=${date}&product=${productID}`
  );
}

// storage

function httpGetStorageStatisticsTotal() {
  return request.get(`/api/storage_statistics/`);
}

function httpGetStorageStatisticsDaily(date) {
  return request.get(`/api/daily_storage_statistics/?date=${date}`);
}

function httpGetStorageStatisticsMonthly(date) {
  return request.get(`/api/monthly_storage_statistics/?date=${date}`);
}

function httpGetStorageStatisticsYearly(date) {
  return request.get(`/api/yearly_storage_statistics/?date=${date}`);
}

// finance

function httpGetFinanceStatisticsTotal() {
  return request.get(`/api/finance_statistics/`);
}

function httpGetFinanceStatisticsDaily(date) {
  return request.get(`/api/daily_finance_statistics/?date=${date}`);
}

function httpGetFinanceStatisticsMonthly(date) {
  return request.get(`/api/monthly_finance_statistics/?date=${date}`);
}

function httpGetFinanceStatisticsYearly(date) {
  return request.get(`/api/yearly_finance_statistics/?year=${date}`);
}

// service

function httpGetServiceStatisticsTotal() {
  return request.get(`/api/service_statistics/`);
}

function httpGetServiceStatisticsDaily(date) {
  return request.get(`/api/daily_service_statistics/?date=${date}`);
}

function httpGetServiceStatisticsMonthly(date) {
  return request.get(`/api/monthly_service_statistics/?date=${date}`);
}

function httpGetServiceStatisticsYearly(date) {
  return request.get(`/api/yearly_service_statistics/?year=${date}`);
}

// client

function httpGetClientStatisticsTotal() {
  return request.get(`/api/client_statistics/`);
}

function httpGetClientStatisticsMonthly({ date, clientID }) {
  return request.get(
    `/api/monthly_client_statistics/?date=${date}&client_id=${clientID}`
  );
}

function httpGetClientStatisticsYearly({ date, clientID }) {
  return request.get(
    `/api/yearly_client_statistics/?date=${date}&client_id=${clientID}`
  );
}

function httpGetClientStatisticsDaily({ date, clientID }) {
  return request.get(
    `/api/daily_client_statistics/?date=${date}&client_id=${clientID}`
  );
}

export {
  httpGetClientStatisticsTotal,
  httpGetClientStatisticsMonthly,
  httpGetClientStatisticsYearly,
  httpGetClientStatisticsDaily,
  httpGetServiceStatisticsTotal,
  httpGetServiceStatisticsDaily,
  httpGetServiceStatisticsMonthly,
  httpGetServiceStatisticsYearly,
  httpGetFinanceStatisticsTotal,
  httpGetFinanceStatisticsDaily,
  httpGetFinanceStatisticsMonthly,
  httpGetFinanceStatisticsYearly,
  httpGetStorageStatisticsTotal,
  httpGetStorageStatisticsDaily,
  httpGetStorageStatisticsMonthly,
  httpGetStorageStatisticsYearly,
  httpGetProductStatisticsTotal,
  httpGetProductStatisticsDaily,
  httpGetProductStatisticsMonthly,
  httpGetTradeStatisticsDaily,
  httpGetTradeStatisticsTotal,
  httpGetTradeStatisticsMonthly,
  httpGetTradeStatisticsYearly,
  httpGetProductStatisticsYearly,
};

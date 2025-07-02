import request from "../request";

function httpGetAllServices() {
  return request.get(`/api/all_services/`);
}

function httpGetServices(page, page_size, filters) {
  return request.get(
    `/api/services/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetServiceOne(id) {
  return request.get(`/api/services/${id}/`);
}

function httpImportServices(data) {
  return request.post(`/api/import_services/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function httpPostService(data) {
  return request.post(`/api/services/`, data);
}

function httpUpdateService({ id, data }) {
  return request.put(`/api/services/${id}/`, data);
}

function httpDeleteService(id) {
  return request.delete(`/api/services/${id}/`);
}

export {
  httpGetAllServices,
  httpGetServices,
  httpGetServiceOne,
  httpImportServices,
  httpPostService,
  httpUpdateService,
  httpDeleteService,
};

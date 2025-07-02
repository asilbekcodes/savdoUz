import request from "../request";

function httpGetWorkers(page, page_size, filters) {
  return request.get(
    `/workers/?page=${page}&page_size=${page_size}${filters && `&${filters}`}`
  );
}

function httpGetWorkerOne(id) {
  return request.get(`/workers/${id}/`);
}

function httpPostWorker(data) {
  return request.post(`/workers/`, data);
}

function httpUpdateWorker({ id, data }) {
  return request.put(`/workers/${id}/`, data);
}

function httpDeleteWorker(id) {
  return request.delete(`/workers/${id}/`);
}

export {
  httpDeleteWorker,
  httpGetWorkerOne,
  httpGetWorkers,
  httpPostWorker,
  httpUpdateWorker,
};

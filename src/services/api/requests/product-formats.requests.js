import request from "../request";

function httpGetAllProductFormats() {
  return request.get(`/api/all_formats/`);
}

function httpGetProductFormats(page, page_size, filters) {
  return request.get(
    `/api/formats/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpImportProductFormats(data) {
  return request.post(`/api/import_formats/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function httpGetProductFormatOne(id) {
  return request.get(`/api/formats/${id}/`);
}

function httpPostProductFormat(data) {
  return request.post(`/api/formats/`, data);
}

function httpUpdateProductFormat({ id, data }) {
  return request.put(`/api/formats/${id}/`, data);
}

function httpDeleteProductFormat(id) {
  return request.delete(`/api/formats/${id}/`);
}

export {
  httpGetAllProductFormats,
  httpGetProductFormats,
  httpGetProductFormatOne,
  httpPostProductFormat,
  httpUpdateProductFormat,
  httpDeleteProductFormat,
  httpImportProductFormats,
};

import request from "../request";

function httpGetLocations() {
  return request.get(`/api/locations/`);
}

export { httpGetLocations };
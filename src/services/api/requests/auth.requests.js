import request from "../request";

function httpGetGuide() {
  return request.get("api/guides/");
}

function httpPostSignIn(loginDto) {
  return request.post("/login/", loginDto);
}

function httpPostSignUp(SignUpDto) {
  return request.post("/create_user_company/", SignUpDto);
}

function httpPostConfirmVerificationCode(data) {
  return request.post("/confirm_verification_code/", data);
}

function httpForgotPassword(data) {
  return request.post("/forgot_password/", data);
}

function httpResetPassword(data) {
  return request.post("/reset_password/", data);
}

function httpGetMe() {
  return request.get("/me/");
}

function httpUpdateMe(data) {
  return request.put(`/me/`, data);
}

function httpUpdateUserPassword(data) {
  return request.post(`/user_password/`, data);
}

function httpVerifyUserPassword(data) {
  return request.post(`/user_reset/`, data);
}

function httpGetCompany() {
  return request.get("/company/");
}

function httpUpdateCompany(data) {
  return request.put(`/company/`, data);
}

export {
  httpGetGuide,
  httpGetCompany,
  httpUpdateCompany,
  httpUpdateUserPassword,
  httpVerifyUserPassword,
  httpForgotPassword,
  httpGetMe,
  httpPostConfirmVerificationCode,
  httpPostSignIn,
  httpPostSignUp,
  httpResetPassword,
  httpUpdateMe,
};

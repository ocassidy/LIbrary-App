import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

// export function checkUsernameAvailability(username) {
//   return request({
//     url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
//     method: 'GET'
//   });
// }
//
// export function checkEmailAvailability(email) {
//   return request({
//     url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
//     method: 'GET'
//   });
// }


// export function getCurrentUser() {
//   if(!localStorage.getItem(ACCESS_TOKEN)) {
//     return Promise.reject("No access token set.");
//   }
//
//   return request({
//     url: API_BASE_URL + "/user/me",
//     method: 'GET'
//   });
// }
//
// export function getUserProfile(username) {
//   return request({
//     url: API_BASE_URL + "/users/" + username,
//     method: 'GET'
//   });
// }
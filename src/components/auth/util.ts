export function hasToken() {
  return localStorage.getItem('token') !== null;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function deleteToken() {
  localStorage.removeItem('token');
}

export function getId() {
  return localStorage.getItem('id');
}

export function setId(id: string) {
  localStorage.setItem('id', id);
}

export function deleteId() {
  localStorage.removeItem('id');
}

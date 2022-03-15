export function setLocalStorage(key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

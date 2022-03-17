let internetConnected = true;

export function setInternetConnected(status) {
  internetConnected = status;
}

export function isInternetConnected() {
  return internetConnected;
}

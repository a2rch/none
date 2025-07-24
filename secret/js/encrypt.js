// js/encrypt.js

async function encryptMessage(message, password) {
  if (!message || !password) {
    return "Please enter both message and password.";
  }

  try {
    const combined = `${password}||${message}`;
    const encoded = btoa(unescape(encodeURIComponent(combined)));
    return encoded;
  } catch (e) {
    return "Encryption failed.";
  }
}

// js/decrypt.js

async function decryptMessage(encrypted, password) {
  if (!encrypted || !password) {
    return "Please enter both encrypted message and password.";
  }

  try {
    const decoded = decodeURIComponent(escape(atob(encrypted)));
    const [storedPassword, message] = decoded.split("||");

    if (storedPassword !== password) {
      return "Incorrect password.";
    }

    return message;
  } catch (e) {
    return "Decryption failed. Invalid input or wrong format.";
  }
}

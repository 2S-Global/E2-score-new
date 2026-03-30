 // generate Strong Password
export function generateStrongPassword(length = 8) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+[]{}|;:,.<>?";

  function getRandom(str) {
    return str[Math.floor(Math.random() * str.length)];
  }

  // Ensure at least one of each
  let password = [
    getRandom(upper),
    getRandom(lower),
    getRandom(numbers),
    getRandom(special),
  ];
  const allChars = upper + lower + numbers + special;
  for (let i = password.length; i < length; i++) {
    password.push(getRandom(allChars));
  }
  return password.join("");
}
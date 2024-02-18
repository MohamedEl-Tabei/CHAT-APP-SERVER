const throwNewError = (message) => {
  throw new Error(message);
};
const Name = (name) => {
  if (name.length === 0) throwNewError("Name is required.");
  else if (name.length < 3)
    throwNewError("Name is too short. The minimum length is 3 characters.");
  else if (name.length > 20)
    throwNewError("Name is too long. The maximum length is 20 characters.");
};
const Password = (password) => {
  if (password.length === 0) throwNewError("Password is required.");
  else if (password.length < 8)
    throwNewError("Password is too short. The minimum length is 8 characters.");
  else if (password.length > 26)
    throwNewError("Password is too long. The maximum length is 26 characters.");
  else if (!/[0-9]/.test(password))
    throwNewError("Password must contain numbers 0-9.");
  else if (!/[a-z]/.test(password))
    throwNewError("Password must contain lowercase letters a-z.");
  else if (!/[A-Z]/.test(password))
    throwNewError("Password must contain uppercase letters A-Z.");
  else if (!/[!@#$%^&*]/.test(password))
    throwNewError("Password must contain special characters [!@#$%^&*].");
};
const Email = (email) => {
  if (email.length === 0) throwNewError("Email is required.");
  else if (!/^[a-zA-Z]+[A-Za-z0-9.-_]+@+[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email))
    throwNewError("Invalid email address.");
};
module.exports = { Name, Password, Email };

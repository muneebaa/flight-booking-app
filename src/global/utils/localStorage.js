export const setUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

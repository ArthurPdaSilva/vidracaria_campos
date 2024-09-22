const clearToken = () => {
  localStorage.removeItem('token');
};

const getToken = () => {
  return localStorage.getItem('token');
};

const setToken = (token: string) => {
  localStorage.setItem(
    'token',
    JSON.stringify(token).replace('"', '').replace('"', ''),
  );
};

export { clearToken, getToken, setToken };

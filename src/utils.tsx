export const handleLogout = () => {
  google.accounts.id.initialize({
    client_id: process.env.REACT_APP_CLIENT_ID ?? "",
    auto_select: true,
  });
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  google.accounts.id.disableAutoSelect();
  window.location.href = "/";
};

export const getAccessToken = () => {
  if (typeof window === "undefined") return "";
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const getSelectedLocationId = () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("selectedLocation");
};

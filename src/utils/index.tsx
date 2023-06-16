import { config } from "@/config/config";

export const getAccessToken = () => {
  if (typeof window === "undefined") return "";
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const getSelectedLocationId = () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("selectedLocation");
};

export const generateLinkForQRCode = (locationId: number, tableId: number) => {
  return `${config.orderApiBaseUrl}/?locationId=${locationId}&tableId=${tableId}`;
};

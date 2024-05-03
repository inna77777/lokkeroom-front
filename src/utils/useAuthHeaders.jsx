import { useEffect, useState } from "react";

const useAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default useAuthHeaders;

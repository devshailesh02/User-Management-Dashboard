import { useState } from "react";

export const useData = () => {
  const [data, setdata] = useState(0);

  return data;
};

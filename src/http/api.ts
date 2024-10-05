import { Product } from "@/types";
import { api } from "./client";

export const getAllProducts = async () => {
  const response:Axios.AxiosXHR<Product[]> = await api.get("/products");
  return  response.data;
};

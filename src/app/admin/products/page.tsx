"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { DataTable } from "../_components/data-table";
import { Loader2 } from "lucide-react";
import { columns } from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/http/api";
import ProductSheet from "./_components/product-sheet";
import { useNewProduct } from "@/store/product/product-store";

const ProductsPage = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const { onOpen } = useNewProduct();
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Products</h3>
        <Button size={"sm"} onClick={onOpen}>
          Add Product
        </Button>
        <ProductSheet />
      </div>
      {isError && <span className="text-red-500">Something went wrong!</span>}
      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={products || []} />
      )}
    </>
  );
};

export default ProductsPage;

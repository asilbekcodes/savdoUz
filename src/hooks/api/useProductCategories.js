import { httpGetAllProductCategories } from "@/services/api/requests/product-categories.requests";
import { httpGetAllProductFormats } from "@/services/api/requests/product-formats.requests";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const useProductCategories = (changeState) => {
  const {
    data = [],
    refetch,
    ...rest
  } = useQuery({
    queryKey: ["all-product-categories"],
    queryFn: httpGetAllProductCategories,
    select: (response) => response.data,
  });

  useEffect(() => {
    refetch();
  }, [changeState, refetch]);

  const options = useMemo(
    () =>
      data.map((option) => ({
        text: `${option.name}`,
        label: `${option.name}`,
        value: option.id,
      })),
    [data]
  );

  return {
    productCategoriesData: data,
    productCategoriesLoading: rest.isLoading,
    productCategoriesError: rest.isError,
    productCategoriesOptions: options,
    ...rest,
  };
};

export default useProductCategories;

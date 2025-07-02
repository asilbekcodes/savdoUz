import { httpGetAllProductFormats } from "@/services/api/requests/product-formats.requests";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const useProductFormats = (changeState) => {
  const {
    data = [],
    refetch,
    ...rest
  } = useQuery({
    queryKey: ["all-product-formats"],
    queryFn: httpGetAllProductFormats,
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
    productFormatsData: data,
    productFormatsLoading: rest.isLoading,
    productFormatsError: rest.isError,
    productFormatsOptions: options,
    ...rest,
  };
};

export default useProductFormats;

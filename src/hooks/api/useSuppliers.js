import { httpGetAllSuppliers } from "@/services/api/requests/suppliers.requests";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const useSuppliers = (changeState) => {
  const {
    data = [],
    refetch,
    ...rest
  } = useQuery({
    queryKey: ["all-suppliers"],
    queryFn: httpGetAllSuppliers,
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
    suppliersData: data,
    suppliersLoading: rest.isLoading,
    suppliersError: rest.isError,
    suppliersOptions: options,
    ...rest,
  };
};

export default useSuppliers;

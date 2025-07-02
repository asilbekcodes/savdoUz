import { httpGetAllServices } from "@/services/api/requests/services.requests";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const useServices = (changeState) => {
  const {
    data = [],
    refetch,
    ...rest
  } = useQuery({
    queryKey: ["all-services"],
    queryFn: httpGetAllServices,
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
    servicesData: data,
    servicesLoading: rest.isLoading,
    servicesError: rest.isError,
    servicesOptions: options,
    ...rest,
  };
};

export default useServices;

import { httpGetAllClients } from "@/services/api/requests/clients.requests";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const useClients = (changeState) => {
  const {
    data = [],
    refetch,
    ...rest
  } = useQuery({
    queryKey: ["all-clients"],
    queryFn: httpGetAllClients,
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
    clientsData: data,
    clientsLoading: rest.isLoading,
    clientsError: rest.isError,
    clientsOptions: options,
    ...rest,
  };
};

export default useClients;

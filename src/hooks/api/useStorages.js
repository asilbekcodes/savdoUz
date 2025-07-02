import { httpGetAllStorages } from "@/services/api/requests/storages.requests";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const useStorages = (changeState) => {
  const {
    data = [],
    refetch,
    ...rest
  } = useQuery({
    queryKey: ["all-storages"],
    queryFn: httpGetAllStorages,
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
    storagesData: data,
    storagesLoading: rest.isLoading,
    storagesError: rest.isError,
    storagesOptions: options,
    ...rest,
  };
};

export default useStorages;

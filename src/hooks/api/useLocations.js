import { httpGetLocations } from "@/services/api/requests/locations";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const useLocations = (changeState) => {
  const {
    data = [],
    refetch,
    ...rest
  } = useQuery({
    queryKey: ["locations"],
    queryFn: httpGetLocations,
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
    locationsData: data,
    locationsLoading: rest.isLoading,
    locationsError: rest.isError,
    locationsOptions: options,
    ...rest,
  };
};

export default useLocations;

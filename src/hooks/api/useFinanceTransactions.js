import { httpGetAllFinanceTrasanctions } from "@/services/api/requests/finance-transactions.requests";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const useFinanceTransactions = (changeState) => {
  const {
    data = [],
    refetch,
    ...rest
  } = useQuery({
    queryKey: ["all-finance-transactions"],
    queryFn: httpGetAllFinanceTrasanctions,
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
    transactionsData: data,
    transactionsLoading: rest.isLoading,
    transactionsError: rest.isError,
    transactionsOptions: options,
    ...rest,
  };
};

export default useFinanceTransactions;

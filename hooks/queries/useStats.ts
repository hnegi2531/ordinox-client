import { getStats } from "@/apis/users";
import { useQuery } from "@tanstack/react-query";

export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
};

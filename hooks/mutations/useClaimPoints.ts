import { claimPoints } from "@/apis/users";
import { useMutation } from "@tanstack/react-query";

export const useClaimPoints = () => {
  return useMutation({ mutationFn: (data: any) => claimPoints() });
};

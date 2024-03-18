import { generateInviteCode } from "@/apis/users";
import { useMutation } from "@tanstack/react-query";

export const useGenerateInviteCode = () => {
  return useMutation({ mutationFn: () => generateInviteCode()});
}
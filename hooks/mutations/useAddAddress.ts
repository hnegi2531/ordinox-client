import { addAddress, reedemInvite } from "@/apis/users";
import { useMutation } from "@tanstack/react-query"

export const useAddAddress = () => {
  return useMutation({ mutationFn: (data: string) => addAddress(data)});
}

export const useReedemInvite = () => {
  return useMutation({ mutationFn: (data: string) => reedemInvite(data)});
}



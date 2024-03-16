import { getUser } from "@/apis/users";
import { useQuery } from "@tanstack/react-query"

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser
  });
}

// export const name = "";
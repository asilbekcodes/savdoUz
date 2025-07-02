import useAuthStore from "@/store/useAuthStore";

const useAuth = () => {
  const { accessToken } = useAuthStore();
  return Boolean(accessToken);
};

export default useAuth;

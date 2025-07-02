import useAuth from "@/hooks/helpers/useAuth";

const IsAuth = ({ children, ...rest }) => {
  const isAuth = useAuth();

  return isAuth ? <>{children}</> : null;
};

export default IsAuth;

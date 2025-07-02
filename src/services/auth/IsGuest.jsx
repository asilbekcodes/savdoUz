import useAuth from "@/hooks/helpers/useAuth";

const IsGuest = ({ children, ...rest }) => {
  const isAuth = useAuth();

  return !isAuth ? <>{children}</> : null;
};

export default IsGuest;

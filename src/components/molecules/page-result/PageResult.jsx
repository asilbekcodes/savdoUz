import ErrorResult from "../error-result/ErrorResult";
import PageLoader from "../page-loader/PageLoader";

const PageResult = ({ children, isLoading = false, error }) => {
  return (
    <div>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>{error ? <ErrorResult error={error} /> : <>{children}</>}</>
      )}
    </div>
  );
};

export default PageResult;

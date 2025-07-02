import * as S from "./HomePage.styles";
import Adventages from "./sections/adventages/Adventages";
import BusinessDirections from "./sections/business-directions/BusinessDirections";
import Footer from "./sections/footer/Footer";
import Header from "./sections/header/Header";
import Prices from "./sections/prices/Prices";

const HomePage = () => {
  return (
    <S.HomePage>
      <Header />
      <BusinessDirections />
      <Adventages />
      <Prices />
      <Footer />
    </S.HomePage>
  );
};

export default HomePage;

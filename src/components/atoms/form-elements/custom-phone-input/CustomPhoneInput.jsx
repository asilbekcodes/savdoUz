import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import CSS for PhoneInput
import styled from "styled-components";

const StyledPhoneInput = styled(PhoneInput)`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  font-size: 14px;
  padding: 6px 14px;

  input {
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.colors.textBasePrimary};
    &:focus-visible {
      border: none;
      outline: none;
    }
  }
`;

const CustomPhoneInput = ({ ...rest }) => {
  const { t } = useTranslation();

  return (
    <StyledPhoneInput
      international
      countryCallingCodeEditable={true}
      defaultCountry="UZ"
      placeholder={t("Telefon raqamingizni kiriting")}
      {...rest}
    />
  );
};

export default CustomPhoneInput;

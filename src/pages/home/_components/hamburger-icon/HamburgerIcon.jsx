import styled from "styled-components";

const color = "#005665";
const heightIcon = "25px";
const widthLine = "45px";
const heightLine = "5px";
const transitionTime = "0.3s";
const rotation = "45deg";
const translateY = parseInt(heightIcon) / 2;

const NoHighlight = styled.a`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const BurgerIcon = styled(NoHighlight)`
  width: ${widthLine};
  height: ${heightIcon};
  position: relative;
  display: block;
  cursor: pointer;

  .burger {
    display: block;
    background: ${(props) => props.theme.colors.primaryColor};
    width: ${widthLine};
    height: ${heightLine};
    position: absolute;
    left: 0;
    border-radius: ${parseInt(heightLine) / 2}px;
    transition: all ${transitionTime};

    &.part-1 {
      top: 0;
    }
    &.part-2 {
      top: 50%;
      transform: translateY(-50%);
    }
    &.part-3 {
      top: 100%;
      transform: translateY(-100%);
    }
  }

  &:hover,
  &:focus {
    .part-1 {
      transform: translateY(${(parseInt(heightLine) / 2) * -1}px);
    }
    .part-3 {
      transform: translateY(${parseInt(heightLine) / 2}px);
    }
  }

  &.active {
    .part-1 {
      transform: translateY(${translateY}px) rotate(${rotation});
    }
    .part-2 {
      opacity: 0;
    }
    .part-3 {
      transform: translateY(-${translateY}px) rotate(-${rotation});
    }
  }
`;

const HamburgerIcon = ({ menu_show, toggleMenu }) => {
  return (
    <BurgerIcon
      onClick={toggleMenu}
      className={menu_show ? "active" : ""}
      id="burger-icon"
      href="#"
    >
      <span className="burger part-1"></span>
      <span className="burger part-2"></span>
      <span className="burger part-3"></span>
    </BurgerIcon>
  );
};

export default HamburgerIcon;

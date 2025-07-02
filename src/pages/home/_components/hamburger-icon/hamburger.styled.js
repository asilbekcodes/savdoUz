import styled, { css } from "styled-components";

const color = "red";
const heightIcon = "20px";
const widthLine = "45px";
const heightLine = "5px";
const transitionTime = "0.3s";
const rotation = "45deg";
const translateY = `calc(${heightIcon} / 2)`;
const translateX = "0";

export const BurgerIcon = styled.div`
  width: ${widthLine};
  height: ${heightIcon};
  position: relative;
  display: block;

  .burger {
    display: block;
    background: ${(props) => props.theme.colors.primaryColor};
    background-color: red;
    width: ${widthLine};
    height: ${heightLine};
    position: absolute;
    left: 0;
    border-radius: calc(${heightLine} / 2);
    transition: all ${transitionTime};
    -webkit-transition: all ${transitionTime};
    -moz-transition: all ${transitionTime};

    &.part-1 {
      top: 0;
    }
    &.part-2 {
      top: 50%;
    }
    &.part-3 {
      top: 100%;
    }
  }

  &:hover,
  &:focus {
    .part-1 {
      transform: translateY(calc(${heightLine} / 2 * -1));
      -webkit-transform: translateY(calc(${heightLine} / 2 * -1));
      -moz-transform: translateY(calc(${heightLine} / 2 * -1));
    }
    .part-3 {
      transform: translateY(calc(${heightLine} / 2));
      -webkit-transform: translateY(calc(${heightLine} / 2));
      -moz-transform: translateY(calc(${heightLine} / 2));
    }
  }

  &.active {
    .part-1 {
      transform: translateY(${translateY}) translateX(${translateX})
        rotate(${rotation});
      -webkit-transform: translateY(${translateY}) translateX(${translateX})
        rotate(${rotation});
      -moz-transform: translateY(${translateY}) translateX(${translateX})
        rotate(${rotation});
    }
    .part-2 {
      opacity: 0;
    }
    .part-3 {
      transform: translateY(calc(${translateY} * -1)) translateX(${translateX})
        rotate(calc(${rotation} * -1));
      -webkit-transform: translateY(calc(${translateY} * -1))
        translateX(${translateX}) rotate(calc(${rotation} * -1));
      -moz-transform: translateY(calc(${translateY} * -1))
        translateX(${translateX}) rotate(calc(${rotation} * -1));
    }
  }
`;

export const NoHighlight = styled.div`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

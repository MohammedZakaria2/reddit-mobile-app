import styled from 'styled-components/native';

export const Th = styled.Text`
  font-family: Roboto-Thin;
  text-align: ${({align}) => align || 'left'};
  font-size: ${({size}) => size || 16}px;
  color: ${({color}) => color || '#000'};
  margin-top: ${({mt}) => mt || 0}px;
  margin-right: ${({mr}) => mr || 0}px;
  margin-bottom: ${({mb}) => mb || 0}px;
  margin-left: ${({ml}) => ml || 0}px;
  letter-spacing: ${({letterSpacing}) => letterSpacing || 0}px;
  ${({lineHeight}) => (lineHeight ? `line-height: ${lineHeight}px;` : '')}
  ${({style}) => style};
`;

export const Rg = styled(Th)`
  font-family: Roboto-Regular;
  font-size: ${({size}) => size || 16}px;
`;

export const Bo = styled(Th)`
  font-family: Roboto-Bold;
  font-size: ${({size}) => size || 18}px;
`;

export const Md = styled(Th)`
  font-family: Roboto-Medium;
  font-size: ${({size}) => size || 18}px;
`;

export const Li = styled(Th)`
  font-family: Roboto-Light;
  font-size: ${({size}) => size || 16}px;
`;

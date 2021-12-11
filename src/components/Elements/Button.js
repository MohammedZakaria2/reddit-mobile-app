import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../theme';

const Pressable = styled.Pressable`
  justify-content: ${({justify}) => justify || 'center'};
  align-items: ${({align}) => align || 'center'};
  width: ${({width}) => (width ? width : 100)}%;
  border-radius: ${({borderRadius}) => borderRadius || 0}px;
  background-color: ${({backgroundColor}) => backgroundColor || colors.primary};
  margin-top: ${({mt}) => mt || 0}px;
  margin-right: ${({mr}) => mr || 0}px;
  margin-bottom: ${({mb}) => mb || 0}px;
  margin-left: ${({ml}) => ml || 0}px;
  padding-top: ${({pt}) => pt || 0}px;
  padding-bottom: ${({pb}) => pb || 0}px;
  padding-left: ${({pl}) => pl || 0}px;
  padding-right: ${({pr}) => pr || 0}px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

export default function Button(props) {
  return (
    <Pressable {...props} disabled={props.disabled} onPress={props.onPress}>
      {props.children}
    </Pressable>
  );
}

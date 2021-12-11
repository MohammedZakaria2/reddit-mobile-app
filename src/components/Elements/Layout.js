import React from 'react';
import styled from 'styled-components/native';

const SafeArea = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;
const Content = styled.View`
  background-color: ${({backgroundColor}) => backgroundColor || 'white'};
  padding-top: ${({pt}) => pt || 0}px;
  padding-bottom: ${({pb}) => pb || 45}px;
  margin-left: ${({pl}) => pl || 20}px;
  margin-right: ${({pr}) => pr || 20}px;
  flex: ${({flex}) => flex || 1};
`;
const Layout = ({children, ...rest}) => (
  <SafeArea>
    <Content {...rest}>{children}</Content>
  </SafeArea>
);
export default Layout;

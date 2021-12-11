import React from 'react';
import styled from 'styled-components';
import {Typography} from '../../theme';
import Button from '../Elements/Button';
import {useNavigation} from '@react-navigation/native';

const LinksWrapper = styled.SafeAreaView`
  flex-direction: row;
`;

const Links = () => {
  const navigation = useNavigation();

  return (
    // <Layout>
    <LinksWrapper>
      <Button
        onPress={() => navigation.navigate('Home')}
        pt={10}
        pb={10}
        width={50}>
        <Typography.Md>Home</Typography.Md>
      </Button>
      <Button
        onPress={() => navigation.navigate('SubReddit')}
        pt={10}
        pb={10}
        width={50}>
        <Typography.Md>SubReddits</Typography.Md>
      </Button>
    </LinksWrapper>
    // </Layout>
  );
};

export default Links;

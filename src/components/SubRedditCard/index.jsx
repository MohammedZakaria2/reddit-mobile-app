import React from 'react';
import {Typography} from '../../theme';
import styled from 'styled-components';

const Card = styled.Pressable`
  margin-bottom: 30px;
  /* flex: 1; */
  /* flex-direction: row; */
  border-radius: 5px;
  background-color: #f3f3f3;
  padding: 15px;
`;
const SubRedditCard = ({children, item}) => {
  return (
    <Card>
      {children}
      <Typography.Rg mb={10}>{item?.data?.title}</Typography.Rg>
      <Typography.Rg mb={10}>
        Comments: {item?.data?.num_comments}
      </Typography.Rg>
      <Typography.Rg mb={10}>Ups: {item?.data?.ups}</Typography.Rg>
    </Card>
  );
};

export default SubRedditCard;

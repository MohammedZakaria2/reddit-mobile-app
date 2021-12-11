import React from 'react';
import {colors, Typography} from '../../theme';
import Button from '../Elements/Button';

const LoadMoreButton = ({loadingLoadMoreButton, loadMore, name}) => {
  return (
    <Button
      width={100}
      pt={5}
      pb={5}
      pr={5}
      pl={5}
      backgroundColor={colors.darkGray}
      onPress={() => loadMore(name)}>
      <Typography.Md color={colors.primary}>
        {loadingLoadMoreButton ? 'Loading...' : 'Load More'}
      </Typography.Md>
    </Button>
  );
};

export default LoadMoreButton;

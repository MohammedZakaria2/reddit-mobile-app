import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import {getData} from '../../api';
import Layout from '../../components/Elements/Layout';
import {Typography} from '../../theme';
import LoadMoreButton from '../../components/LoadMoreButton';
import {checkURL} from '../../helpers/functions';

const FasImageStyled = styled(FastImage)`
  width: 300px;
  height: 300px;
  align-self: center;
  margin: 10px 0;
`;

const Card = styled.Pressable`
  margin-bottom: 30px;
  border-radius: 5px;
  background-color: #f3f3f3;
  padding: 15px;
`;

const CardFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Posts = ({route}) => {
  const {subredditPrefix} = route.params;
  const [posts, setPosts] = useState([]);
  const [loadingLoadMoreButton, setLoadingLoadMoreButton] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getData(
        `${subredditPrefix}/.json?limit=25&after=null&count=10`,
      );
      setPosts(data.data);
    })();
  }, [subredditPrefix]);

  const renderPost = ({item}) => {
    // check if url of image
    const isImage = checkURL(
      item.data.url_overridden_by_dest
        ? item.data.url_overridden_by_dest
        : 'no-image',
    );
    return (
      <Card>
        <Typography.Rg lineHeight={30} size={22} mb={10}>
          {item?.data?.title}
        </Typography.Rg>
        {isImage ? (
          <FasImageStyled
            source={{
              uri: item.data.url_overridden_by_dest,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : null}
        <CardFooter>
          <Typography.Th mb={10}>
            Comments: {item?.data?.num_comments}
          </Typography.Th>
          <Typography.Th mb={10}>Ups: {item?.data?.ups}</Typography.Th>
        </CardFooter>
      </Card>
    );
  };

  const loadMore = async name => {
    try {
      setLoadingLoadMoreButton(true);
      const data = await getData(
        `${subredditPrefix}/.json?limit=25&after=${name}&count=10`,
      );
      const final = {
        ...data.data,
        children: [...posts.children, ...data.data.children],
      };
      setPosts(final);
      setLoadingLoadMoreButton(false);
    } catch (error) {
      setLoadingLoadMoreButton(false);

      console.log('error:', error);
    }
  };

  return (
    <Layout>
      <Typography.Bo lineHeight={30} size={20} mt={15} mb={20}>
        {subredditPrefix}'s posts
      </Typography.Bo>
      {posts?.children?.length > 0 && (
        <FlatList
          data={posts?.children}
          renderItem={renderPost}
          keyExtractor={item => item?.data?.id}
          ListFooterComponent={
            <LoadMoreButton
              loadingLoadMoreButton={loadingLoadMoreButton}
              name={posts.children[posts.children.length - 1].data.name}
              loadMore={name => loadMore(name)}
            />
          }
        />
      )}
    </Layout>
  );
};

export default Posts;

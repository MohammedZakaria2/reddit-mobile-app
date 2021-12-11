import React, {useEffect, useState} from 'react';
import {Button as ReactButton, FlatList, View} from 'react-native';
import {getData} from '../../api';
import Layout from '../../components/Elements/Layout';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';
import {Typography} from '../../theme';
import {getStorageData, storeData} from '../../helpers/storage';
import {useDispatch} from 'react-redux';
import {setFollow, setSubreddits} from '../../store/slices/subredditsSlice';
import {useSelector} from 'react-redux';
import LoadMoreButton from '../../components/LoadMoreButton';
import {checkURL} from '../../helpers/functions';

const FasImageStyled = styled(FastImage)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-self: center;
  margin: 10px 0;
  background-color: white;
`;

const Card = styled.Pressable`
  margin-bottom: 30px;
  /* flex: 1; */
  /* flex-direction: row; */
  border-radius: 5px;
  background-color: #f3f3f3;
  padding: 15px;
`;

const SubReddit = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [loadingLoadMoreButton, setLoadingLoadMoreButton] = useState(false);

  const {followedSubreddits, subreddits} = useSelector(
    state => state.subreddits,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let list = await getData(
          'subreddits/.json?limit=25&after=null&count=10',
        );
        dispatch(setSubreddits(list.data));

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('error:', error);
      }
    })();
  }, [dispatch]);

  const loadMore = async name => {
    try {
      setLoadingLoadMoreButton(true);
      const data = await getData(
        `subreddits/.json?limit=25&after=${name}&count=10`,
      );
      const final = {
        ...data.data,
        children: [...subreddits.children, ...data.data.children],
      };

      dispatch(setSubreddits(final));
      setLoadingLoadMoreButton(false);
    } catch (error) {
      setLoadingLoadMoreButton(false);

      console.log('error:', error);
    }
  };

  const follow = async subreddit => {
    try {
      const myList = await getStorageData('@my-subreddit');
      const newList = [...myList, subreddit];
      await storeData('@my-subreddit', newList);
      dispatch(setFollow(newList));
    } catch (error) {
      console.log('error:', error);
    }
  };

  const checkFollowed = id => {
    let isExcited = false;
    followedSubreddits.forEach(followedItem => {
      if (followedItem?.id === id) {
        isExcited = true;
      }
    });
    return isExcited;
  };
  const renderItem = ({item}) => {
    const isFollowed = checkFollowed(item.data.id);
    const isImage = checkURL(
      item?.data?.header_img ? item?.data?.header_img : 'no-image',
    );
    return (
      <Card
        onPress={() =>
          navigation.navigate('Posts', {
            subredditPrefix: item?.data?.display_name_prefixed,
          })
        }>
        {isImage && (
          <FasImageStyled
            source={{
              uri: item?.data?.header_img,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <View>
          <Typography.Bo mb={10} mt={15} size={25}>
            {item?.data?.title}
          </Typography.Bo>
          <Typography.Li lineHeight={30} size={20} mt={2} mb={5}>
            {item?.data?.public_description}
          </Typography.Li>
          <ReactButton
            disabled={isFollowed}
            onPress={() =>
              follow({
                title: item.data.title,
                id: item?.data?.id,
                header_img: item?.data?.header_img,
                public_description: item?.data?.public_description,
                display_name_prefixed: item?.data?.display_name_prefixed,
              })
            }
            title={isFollowed ? 'Followed' : 'Follow'}
          />
        </View>
      </Card>
    );
  };

  return (
    <Layout>
      <Typography.Bo lineHeight={30} size={20} mt={15} mb={20}>
        Subreddit list
      </Typography.Bo>
      {/* <View style={{position: 'relative'}}> */}
      {loading && (
        <Typography.Rg size={18} mt={15} mb={20}>
          loading subreddits
        </Typography.Rg>
      )}
      {!loading && subreddits?.children?.length > 0 && (
        <FlatList
          data={subreddits?.children}
          renderItem={renderItem}
          keyExtractor={item => item?.data?.id}
          ListFooterComponent={
            <LoadMoreButton
              name={
                subreddits?.children[subreddits?.children.length - 1].data.name
              }
              loadMore={name => loadMore(name)}
              loadingLoadMoreButton={loadingLoadMoreButton}
            />
          }
        />
      )}
      {!loading && subreddits?.children?.length < 0 && (
        <Typography.Rg size={18} mt={15} mb={20}>
          Con't load subreddit list for now please try again
        </Typography.Rg>
      )}
      {/* </View> */}
    </Layout>
  );
};

export default SubReddit;

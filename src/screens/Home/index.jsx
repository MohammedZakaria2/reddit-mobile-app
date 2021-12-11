import React, {useEffect} from 'react';
import {Button, FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import Layout from '../../components/Elements/Layout';
import {checkURL} from '../../helpers/functions';
import {getStorageData, storeData} from '../../helpers/storage';
import {setFollow} from '../../store/slices/subredditsSlice';
import {Typography} from '../../theme';

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
  border-radius: 5px;
  background-color: #f3f3f3;
  padding: 15px;
`;

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {followedSubreddits} = useSelector(state => state.subreddits);

  useEffect(() => {
    (async () => {
      try {
        const myList = await getStorageData('@my-subreddit');
        dispatch(setFollow(myList));
      } catch (error) {
        console.log('error:', error);
      }
    })();
  }, [dispatch]);

  const unFollow = async subreddit => {
    try {
      const currentList = await getStorageData('@my-subreddit');
      const newList = currentList.filter(item => item.id !== subreddit.id);
      await storeData('@my-subreddit', [...newList]);
      dispatch(setFollow(newList));
    } catch (error) {
      console.log('error:', error);
    }
  };

  const renderItem = ({item}) => {
    const isImage = checkURL(item.header_img ? item.header_img : 'no-image');
    return (
      <Card
        onPress={() =>
          navigation.navigate('Posts', {
            subredditPrefix: item?.display_name_prefixed,
          })
        }>
        {isImage && (
          <FasImageStyled
            source={{
              uri: item?.header_img,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <View>
          <Typography.Bo mb={10} mt={15} size={25}>
            {item?.title}
          </Typography.Bo>
          <Typography.Li lineHeight={30} size={20} mt={2} mb={5}>
            {item?.public_description}
          </Typography.Li>
          <Button
            onPress={() =>
              unFollow({
                id: item?.id,
              })
            }
            title="Un Follow"
          />
        </View>
      </Card>
    );
  };

  return (
    <Layout>
      {/* <View> */}
      <Typography.Bo lineHeight={30} size={20} mt={15} mb={20}>
        My Subreddit list
      </Typography.Bo>
      {followedSubreddits.length > 0 ? (
        <FlatList
          data={followedSubreddits}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
        />
      ) : (
        <Typography.Rg size={18} mt={15} mb={20}>
          You didn't Follow any Subreddit yet.
        </Typography.Rg>
      )}
      {/* </View> */}
    </Layout>
  );
};

export default Home;

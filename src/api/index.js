import axios from 'axios';

const baseURL = 'https://www.reddit.com/';

const getData = async url => {
  try {
    const {data} = await axios.request({
      url,
      baseURL,
    });
    return data;
  } catch (error) {
    console.error('GET error: ', 'error');
    if (error.response) {
      throw error.response.data.error.message;
    } else {
      throw error;
    }
  }
};

export {getData};

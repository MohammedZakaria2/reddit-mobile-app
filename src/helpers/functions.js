export const checkURL = url => {
  try {
    return url.match(/.(jpeg|jpg|gif|png)$/) != null;
  } catch (error) {
    console.log('error:', error);
    return false;
  }
};

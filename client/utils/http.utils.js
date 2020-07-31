export default (axios) => ({
  postData: (url, data) => axios.post(url, data).then((response) => response.data),
  getData: (url) => axios.get(url).then((response) => response.data),
  putData: (url, data) => axios.put(url, data).then((response) => response.data),
});

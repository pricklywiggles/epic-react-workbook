function client(endpoint, customConfig = {}) {
  console.log('Querying: ', endpoint);
  const config = {
    method: 'GET',
    ...customConfig,
  };
  const fullUrl = `${process.env.REACT_APP_API_URL}/${endpoint}`;
  return window.fetch(fullUrl, config).then(response => {
    console.log(response);
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response.json();
  });
}

export {client};

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/

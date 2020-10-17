function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async response => {
      const responseData = await response.json()
      if (!response.ok) return Promise.reject(responseData)
      else return responseData
    })
}

export {client}

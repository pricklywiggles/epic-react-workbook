const apiURL = process.env.REACT_APP_API_URL

function client(endpoint, customConfig = {}) {
  const headers = customConfig.token ? { "Authorization": `Bearer ${customConfig.token}` } : {}
  const config = {
    method: 'GET',
    headers: {
      ...headers
    },
    ...customConfig,
  }
  console.log("Fetching with", config)
  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}

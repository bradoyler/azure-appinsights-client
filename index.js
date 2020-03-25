const debug = require('debug')('ai-client')
const axios = require('axios')

module.exports = ({ appId, apiKey, timeout = 20000 } = {}) => {
  if (!appId || !apiKey) {
    throw new Error('AppId & APIKey required')
  }
  const baseURL = `https://api.applicationinsights.io/v1/apps/${appId}`

  const instance = {}
  const config = {
    baseURL,
    timeout
  }

  const $http = axios.create(config)

  $http.interceptors.request.use((config) => {
    config.headers['x-api-key'] = apiKey
    debug('request ->', config.method.toUpperCase(), config.baseURL + config.url)
    return config
  })

  function convertTable (columns, rows) {
    return rows.map(row => columns.reduce((obj, col, idx) => {
      obj[col.name] = row[idx]
      return obj
    }, {}))
  }

  instance.get = (url) => $http.get(url)
  instance.post = (url, data) => $http.post(url, data)
  instance.query = (query, timespan) => {
    return $http.post(`/query?timespan=${timespan}`, { query })
      .then(res => convertTable(res.data.tables[0].columns, res.data.tables[0].rows))
  }

  // factory instance
  return instance
}

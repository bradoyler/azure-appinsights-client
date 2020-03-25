require('dotenv').config()
const AppInsightsClient = require('../index')
const appId = process.env.AI_APPID
const apiKey = process.env.AI_APIKEY

const client = AppInsightsClient({ appId, apiKey })

const timespan = 'PT12H'
const query = 'customEvents | project name,timestamp,operation_Name,cloud_RoleName | limit 2'

client.query(query, timespan)
  .then(res => console.log(res))
  .catch(ex => console.error(ex))

client.query(query, timespan, false)
  .then(res => console.log(res))
  .catch(ex => console.error(ex))

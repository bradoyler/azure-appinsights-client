## AppInsights Client for Javascript

A javascript client to query App Insights REST API
...because the [LogAnalyticsClient Azure SDK](https://github.com/Azure/azure-sdk-for-node/tree/master/lib/services/loganalytics#how-to-use) is not easy to use

## Install
```sh
npm install appinsights-client
```

### Usage

```js
const AppInsightsClient = require('appinsights-client')
const client = AppInsightsClient('AI_APPID', 'AI_APIKEY')

const timespan = 'PT12H' // past 12 hrs
const query = 'customEvents | project name,timestamp,operation_Name,cloud_RoleName | limit 2'

const objects = await client.query(query, timespan)
```

### API Reference
https://dev.applicationinsights.io/reference

### Get an API Key
![image](https://dev.applicationinsights.io/content/010.png)



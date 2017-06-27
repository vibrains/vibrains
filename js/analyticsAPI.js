  // Replace with your view ID.
  var VIEW_ID = '91376806';

  // Query the API and print the results to the page.
  function queryReports() {
    gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [
        {
          viewId: VIEW_ID,
          dateRanges: [
          {
            startDate: '7daysAgo',
            endDate: 'today'
          }
          ],
          metrics: [
          {
            expression: 'ga:sessions'
          }
          ],
          "dimensions": [

          {"name":"ga:browser"},

          {"name":"ga:date"},

          {"name":"ga:continent"},

          {"name":"ga:subContinent"},

          {"name":"ga:country"},

          {"name":"ga:region"},

          {"name":"ga:metro"},

          {"name":"ga:city"}

          ]
        }
        ]
      }
    }).then(displayResults, console.error.bind(console));
  }

  function displayResults(response) {
    var formattedJson = JSON.stringify(response.result, null, 2);
    document.getElementById('query-output').value = formattedJson;
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    })
  }
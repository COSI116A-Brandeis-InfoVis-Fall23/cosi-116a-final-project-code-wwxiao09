// load the data
const csvFilePath = '../data/MBTA_Rail_Ridership.csv'; 
const csv = require('csvtojson');
const fs = require('fs');
greenStopKeep = ["Lechmere", "Science Park", "North Station", "Haymarket", "Government Center", "Park Street", "Boylston", "Arlington", "Copley", "Prudential", "Symphony", "Hynes", "Kenmore"]

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    //console.log(jsonObj);
    jsonObj = jsonObj.filter(obj => greenStopKeep.includes(obj['stop_name']));

    jsonObj.forEach((obj, idx) => {
        console.log(obj);

        delete obj['ObjectId'];
        delete obj['mode'];
        delete obj['season'];
        delete obj['day_type_id'];
        delete obj['day_type_name'];
        delete obj['total_ons'];
        delete obj['total_offs'];
        delete obj['number_service_days'];
        
        
      });


      const jsonData = JSON.stringify(jsonObj, null, 2);
      const parsedData = JSON.parse(jsonData);
      fs.writeFileSync('../data/data.json', jsonData);
    function calculateAverages(data) {
      // Temporary object to hold the sums and counts
      const tempResult = {};
  
      // Sum up the flows and count the entries for each route and time period
      data.forEach(item => {
          const route = item.route_name;
          const timePeriod = item.time_period_name;
          const flow = parseInt(item.average_flow, 10);
          const on = parseInt(item.average_ons, 10);
          const off = parseInt(item.average_offs, 10);
  
          if (!tempResult[route]) {
              tempResult[route] = {};
          }
  
          if (!tempResult[route][timePeriod]) {
              tempResult[route][timePeriod] = { totalFlow: 0, count: 0 , total_ons: 0, total_offs: 0};
          }
  
          tempResult[route][timePeriod].totalFlow += flow;
          tempResult[route][timePeriod].total_ons += on;
          tempResult[route][timePeriod].total_offs += off;
          tempResult[route][timePeriod].count += 1;
      });
  
      // Final result array
      const finalResult = [];
  
      // Calculate averages and restructure the data
      for (const route in tempResult) {
          const routeData = { Route_name: route };
  
          for (const timePeriod in tempResult[route]) {
              const data = tempResult[route][timePeriod];
              routeData[timePeriod] = routeData[timePeriod] || {};
              routeData[timePeriod]["avgFlow"] = data.totalFlow / data.count;
              routeData[timePeriod]["avgOns"] = data.total_ons / data.count;
              routeData[timePeriod]["avgOffs"] = data.total_offs / data.count;
              
          }
  
          finalResult.push(routeData);
      }
  
      return finalResult;
   }
   function calculateOverallAverages(data) {
    var overallAverages = {};
    data.forEach(function(entry) {
      var routeName = entry.Route_name;
      overallAverages[routeName] = {
        totalSum: 0,
        totalCount: 0
      };
      Object.keys(entry).forEach(function(period) {
        if (period !== 'Route_name') {
          overallAverages[routeName].totalSum += entry[period];
          overallAverages[routeName].totalCount++;
        }
      });
    });
  
    // Calculate the overall average for each route
    Object.keys(overallAverages).forEach(function(route) {
      var totalSum = overallAverages[route].totalSum;
      var totalCount = overallAverages[route].totalCount;
      overallAverages[route] = totalSum / totalCount;
    });
    return overallAverages;
  }
  
  // Load the JSON data and calculate averages
  const averages = calculateAverages(parsedData);
  const bar_averages=calculateOverallAverages(averages)
  const line_chart_data = JSON.stringify(averages, null, 2);
  const bar_chart_data = JSON.stringify(bar_averages, null, 2);
  fs.writeFileSync('../data/line_chart_data.json', line_chart_data);
  fs.writeFileSync('../data/bar_chart_data.json', bar_chart_data);
  console.log(averages);
  
  })
  .catch((err) => {
    console.error(err);
  });
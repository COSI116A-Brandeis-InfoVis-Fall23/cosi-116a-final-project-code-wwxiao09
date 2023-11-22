const csvFilePath = '../data/MBTA_Rail_Ridership.csv'; 
const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    //console.log(jsonObj);

    jsonObj.forEach(obj => {
        delete obj['mode'];
        delete obj['season'];
        delete obj['day_type_id'];
        delete obj['day_type_name'];
        delete obj['total_ons'];
        delete obj['total_offs'];
        delete obj['number_service_days'];
      });


    const jsonData = JSON.stringify(jsonObj, null, 2);
    fs.writeFileSync('../data/data.json', jsonData);
  })
  .catch((err) => {
    console.error(err);
  });
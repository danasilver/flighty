#!/usr/bin/env node

var fs = require('fs')
  , d3 = require('d3')
  , path = require('path');

var aliases = {
  'Apt 1': 'originapt',
  'orgapt': 'originapt',
  'Apt 2': 'destapt',
  'desapt': 'destapt',
  'Quarter': 'quarter',
  'quart': 'quarter',
  'City Name 1': 'origin',
  'ocity': 'origin',
  'City Name 2': 'destination',
  'dcity': 'destination',
  'City Num 1': 'originnum',
  'origincity': 'originnum',
  'City Num 2': 'destnum',
  'destcity': 'destnum',
  '\rDistance': 'distance',
  '\rPassengers': 'passengers',
  'Average\rFare': 'fare',
  'Lgest.\rCarrrier\rIn Mkt.': 'carrier_lg',
  'Avg. Fare Lg. Car.': 'fare_lg'
};

var csvPath = path.resolve(__dirname, '../data/csv')
  , csvFileNames = fs.readdirSync(csvPath)
  , combinedJSON = [];

for (var i = 0, l = csvFileNames.length; i < l; i++) {
  var csvFilePath = path.resolve(csvPath, csvFileNames[i])
    , csvContents = fs.readFileSync(csvFilePath, 'utf-8')
    , parsedCsv = d3.csv.parse(csvContents);

  parsedCsv.forEach(function(d) {
    for (var k in d) {
      if (k in aliases) {
        var val = d[k];
        delete d[k];
        d[aliases[k]] = val;
      }
    }
  });

  for (var j = 0; j < parsedCsv.length; j++) {
    combinedJSON.push(parsedCsv[j]);
  }
}

fs.writeFileSync(path.resolve(__dirname, '../data/historic-data.json'), JSON.stringify(combinedJSON));

#!/usr/bin/env node

var fs = require('fs')
  , d3 = require('d3')
  , path = require('path');

var airportsFilePath = path.resolve(__dirname, '../data/airports/airports-clean.csv')
  , airportsContents = fs.readFileSync(airportsFilePath, 'utf8')
  , parsedAirports = d3.csv.parse(airportsContents);

parsedAirports.forEach(function(d) {
  d.latitude = degreesToDecimal(d.ARPLatitude);
  d.longitude = degreesToDecimal(d.ARPLongitude);
});

fs.writeFileSync(path.resolve(__dirname, '../data/airports/airports.json'), JSON.stringify(parsedAirports));

function degreesToDecimal(degrees) {
  var parts = degrees.split('-');
  parts[2] = parts[2].substr(0, 7);

  return +parts[0] + (+parts[1] / 60) + (+parts[2] / 3600);
}
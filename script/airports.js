#!/usr/bin/env node

var fs = require('fs')
  , d3 = require('d3')
  , path = require('path');

var airportsFilePath = path.resolve(__dirname, '../data/airports/airports.csv')
  , flightsFilePath = path.resolve(__dirname, '../data/airports/flights-airport.csv')
  , airportsContents = fs.readFileSync(airportsFilePath, 'utf8')
  , flightsContents = fs.readFileSync(flightsFilePath, 'utf8')
  , parsedAirports = d3.csv.parse(airportsContents)
  , parsedFlights = d3.csv.parse(flightsContents);

var originAirports = {};

for (var i = 0, l = parsedFlights.length; i < l; i++) {
  var apt = parsedFlights[i].origin;
  if (originAirports[apt]) {
    originAirports[apt] += +parsedFlights[i].count;
  } else {
    originAirports[apt] = +parsedFlights[i].count;
  }
}

parsedAirports = parsedAirports.filter(function(d) {
  if (''+d.iata in originAirports) return true;
  return false;
});

parsedAirports.forEach(function(d, i) {
  d.count = originAirports[d.iata];
});

fs.writeFileSync(path.resolve(__dirname, '../data/airports/airports.json'), JSON.stringify(parsedAirports));

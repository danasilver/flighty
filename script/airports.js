#!/usr/bin/env node

var fs = require('fs')
  , d3 = require('d3')
  , path = require('path');

var airportsFilePath = path.resolve(__dirname, '../data/airports/airports-clean.csv')
  , airportsContents = fs.readFileSync(airportsFilePath, 'utf8')
  , parsedAirports = d3.csv.parse(airportsContents);

var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
              "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
              "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
              "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
              "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"];

parsedAirports = parsedAirports.filter(function(d) {
  for (var i = 0; i < states.length; i++) if (d.State === states[i]) return true;
  return false;
});

parsedAirports.forEach(function(d, i) {
  d.latitude = degreesToDecimal(d.ARPLatitude);
  d.longitude = degreesToDecimal(d.ARPLongitude);
});

fs.writeFileSync(path.resolve(__dirname, '../data/airports/airports.json'), JSON.stringify(parsedAirports));

function degreesToDecimal(degrees) {
  var parts = degrees.split('-');
  parts[3] = parts[2].substr(7, 1);
  parts[2] = parts[2].substr(0, 7);

  var unsigned = +parts[0] + (+parts[1] / 60) + (+parts[2] / 3600);

  return (parts[3] === 'W' || parts[3] === 'S') ? 0 - unsigned : unsigned;
}
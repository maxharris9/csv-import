Package.describe({
  summary: "csv import component for Meteor",
  version: "1.0.1",
  git: "https://github.com/max-leportlabs/csv-import"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.use(['underscore'], ['client', 'server']);
  api.addFiles('main.js', ['client', 'server']);

  api.export(['csvToArray' ], ['client', 'server']);
});

Package.onTest(function(api) {
  api.use(['maxharris9:csv-import', 'tinytest', 'test-helpers']);
  api.addFiles('testcsv.js', ['client', 'server']);
});
var makeObjects = function (header, rows) {
  return _.chain(rows)
    .map(function (row) {
      var newObject = {};

      for (var i = 0; i < row.length; i++) {
        if (header.length < i) {
          console.log('fatal error: column without field name');
        }
        else {
          var fieldName = header[i];
          newObject[fieldName] = row[i];
        }
      }
      return (0 === _.size(newObject)) ? null : newObject; // empty row? pass it through as null, which will be removed by the reject line below
    })
    .reject(function (item) { return null === item; })
    .value();
};

// original source: http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
csvToArray = function (csv, delimiter) {
  var reviver = function (row, column, value) { return value; };
  var chars = csv.split(''), c = 0, cc = chars.length, start, end, table = [], row;
  while (c < cc) {
    table.push(row = []);
    while (c < cc && '\r' !== chars[c] && '\n' !== chars[c]) {
      start = end = c;
      if ('"' === chars[c]) {
        start = end = ++c;
        while (c < cc) {
          if ('"' === chars[c]) {
            if ('"' !== chars[c+1]) { break; }
            else { chars[++c] = ''; } // unescape ""
          }
          end = ++c;
        }
        if ('"' === chars[c]) { ++c; }
        while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && delimiter !== chars[c]) { ++c; }
      } else {
        while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && delimiter !== chars[c]) { end = ++c; }
      }
      row.push(reviver(table.length - 1, row.length, chars.slice(start, end).join('')));
      if (delimiter === chars[c]) { ++c; }
    }
    if ('\r' === chars[c]) { ++c; }
    if ('\n' === chars[c]) { ++c; }
  }
  if (table.length > 1) {
    return makeObjects(table[0], table.slice(1));
  }
};
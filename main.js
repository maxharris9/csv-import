var makeObjects = function (header, rows) {
    return _.map(rows, function (row) {
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
        return newObject;
    });
};

// original source: http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
csvToArray = function (strData, strDelimiter) {
    // check to see if the delimiter is defined. if not, then default to comma.
    strDelimiter = (strDelimiter || ",");

    // create a regular expression to parse the csv values.
    var objPattern = new RegExp(
        (
            // delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );

    // create an array to hold our data. give the array a default empty first row.
    var arrData = [];

    // create an array to hold our individual pattern matching groups.
    var arrMatches = null;

    var headerFields = [];
    var firstRow = true;

    // keep looping over the regular expression matches until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // check to see if the given delimiter has a length (is not the start of string) and if it matches field delimiter.
        // if id does not, then we know that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter) {
            // since we have reached a new row of data, add an empty row to our data array.
            arrData.push([]);

            firstRow = false;
        }

        var strMatchedValue;

        // now that we have our delimiter out of the way, let's check to see which kind of value we captured (quoted or unquoted).
        if (arrMatches[2]) {
            // we found a quoted value. when we capture this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp( "\"\"", "g"),
                "\""
                );

        } else {
            // we found a non-quoted value.
            strMatchedValue = arrMatches[3];
        }

        if (firstRow) {
            headerFields.push(strMatchedValue);
        }
        else {
            // now that we have our value string, let's add it to the data array.
            arrData[arrData.length - 1].push(strMatchedValue);
        }
    }

    return makeObjects(headerFields, arrData);
};

var fs = require('fs'),
    util = require('util'),
    xml2js = require('xml2js');

fs.readFile('simple.scxml', function(err, data) {
    if (err || !data)
    {
        console.log('ERR: Failed to read file'.bold.error, err);
        return;
    }

    xml2js.parseString(data,
        function (err, result) {
            if (err)
            {
                console.log(err);
                return;
            }
            console.log('To retain comments:');
            console.log(util.inspect(result, false, 5, true));
            if (!result || !result.scxml
                || !result.scxml['%'])
            {
                console.log('ERR: Comments not found!\n');
            }
            else
            {
                console.log('OK: Comments found.\n');
            }
        });

    xml2js.parseString(data,
        { ignoreComments: true, },
        function (err, result) {
            if (err)
            {
                console.log(err);
                return;
            }
            console.log('To discard/ignore comments:');
            console.log(util.inspect(result, false, 5, true));
            if (result && !result.scxml
                && result.scxml['%'])
            {
                console.log('ERR: Comments not expected to be retained!');
            }
            else
            {
                console.log('OK: Comments discarded/not found.');
            }
        });
});

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
            console.log('XML -> JSON: To retain comments:');
            console.log(util.inspect(result, false, 5, true));
            if (!result || !result.scxml
                || !result.scxml['%'])
            {
                console.log('ERR: Comments not found in JSON!\n');
            }
            else
            {
                console.log('OK: Comments found in JSON.\n');
                var builder = new xml2js.Builder({headless:true}),
                    xml = builder.buildObject(result);
                console.log('JSON -> XML: To retain comments:');
                console.log(xml);
                if (xml.indexOf('<!--') >= 0)
                {
                    console.log('OK: Comments found in rebuilt XML.\n');
                }
                else
                {
                    console.log('ERR: Comments not found in rebuilt XML!\n');
                }
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
            console.log('XML -> JSON: To discard/ignore comments:');
            console.log(util.inspect(result, false, 5, true));
            if (result && !result.scxml
                && result.scxml['%'])
            {
                console.log('ERR: Comments not expected to be retained in JSON!\n');
            }
            else
            {
                console.log('OK: Comments discarded/not found in JSON.\n');
                var builder = new xml2js.Builder({headless:true}),
                    xml = builder.buildObject(result);
                console.log('JSON -> XML: No comments appear out of thin air:');
                console.log(xml);
                if (xml.indexOf('<!--') < 0)
                {
                    console.log('OK: Rebuilt XML is empty of comments.\n');
                }
                else
                {
                    console.log('ERR: Comments appeared in rebuilt XML!\n');
                }
            }
        });
});

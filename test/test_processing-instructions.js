var fs = require('fs'),
    util = require('util'),
    xml2js = require('xml2js'),
    explicitArray = false;

fs.readFile('simple.scxml', function(err, data) {
    if (err || !data)
    {
        console.log('ERR: Failed to read file'.bold.error, err);
        return;
    }

    xml2js.parseString(data,
        {
            ignoreComments: true,
            ignoreProcInst: false,
            explicitArray: explicitArray
        },
        function (err, result) {
            if (err)
            {
                console.log(err);
                return;
            }
            console.log('XML -> JSON: To retain processing instructions:');
            console.log(util.inspect(result, false, 50, true));
            if (!result || !result.scxml
                || !result.scxml['?'])
            {
                console.log('ERR: Processing instructions not found in JSON!\n');
            }
            else
            {
                console.log('OK: Processing instructions found in JSON.\n');
                var builder = new xml2js.Builder({headless:true}),
                    xml = builder.buildObject(result);
                console.log('JSON -> XML: To retain processing instructions:');
                console.log(xml);
                if (xml.indexOf('<?') >= 0)
                {
                    console.log('OK: Processing instructions found in rebuilt XML.\n');
                }
                else
                {
                    console.log('ERR: Processing instructions not found in rebuilt XML!\n');
                }
            }
        });

    xml2js.parseString(data,
        {
            ignoreComments: true,
            ignoreProcInst: true,
            explicitArray: explicitArray
        },
        function (err, result) {
            if (err)
            {
                console.log(err);
                return;
            }
            console.log('XML -> JSON: To discard/ignore processing instructions:');
            console.log(util.inspect(result, false, 50, true));
            if (result && !result.scxml
                && result.scxml['?'])
            {
                console.log('ERR: Processing instructions not expected to be retained in JSON!\n');
            }
            else
            {
                console.log('OK: Processing instructions discarded/not found in JSON.\n');
                var builder = new xml2js.Builder({headless:true}),
                    xml = builder.buildObject(result);
                console.log('JSON -> XML: No processing instructions appear out of thin air:');
                console.log(xml);
                if (xml.indexOf('<?') < 0)
                {
                    console.log('OK: Rebuilt XML is empty of processing instructions.\n');
                }
                else
                {
                    console.log('ERR: Processing instructions appeared in rebuilt XML!\n');
                }
            }
        });
});

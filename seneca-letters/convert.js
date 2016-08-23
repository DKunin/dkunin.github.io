var fs = require('fs');
var utf8 = require('utf8');
var toMarkdown = require('to-markdown');
var Iconv  = require('iconv').Iconv;
var conv = new Iconv('windows-1251', 'utf8');
var fileList = fs.readdir('./', function(err, data){
    var promises = data
        .filter(singleName => singleName.includes('htm'))
        .map(convertHtmlToMarkDown);
    Promise
        .all(promises)
        .then(results => {
            console.log(results, 'done converting');
        })
});

function convertHtmlToMarkDown(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, function(err, data){
            if (err) {
                console.log(err);
                return;
            }
            fs.writeFile(fileName.split('.')[0] + '.md', toMarkdown(conv.convert(data).toString(), { gfm: true }).replace(/\[\*\*\<\<\<\*\*\].+\[\*\*\>\>\>\*\*\]\(txt(\d+).htm\)/g, ''), function(){
                resolve('done')
            });
        })
    })
};
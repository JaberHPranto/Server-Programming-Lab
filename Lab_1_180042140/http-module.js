const http = require('http');
const content = require('./loadContent')
// console.log(content);

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.write(`<h1>Hello World<h1>`)
        res.end()
    }
    else if (req.url == '/home')
    {
        res.write(content.aboutHtml);
        res.end();
        
    } else {
        res.write("Page not found :(")
        res.end()
    }
})

module.exports={server}
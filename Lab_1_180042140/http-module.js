const http = require('http');
const {aboutHtml,blogHtml,contactHtml,indexHtml,pricingHtml,servicesHtml,workHtml} = require('./loadContent')


const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.write(indexHtml)
    }
    
    else if (req.url == '/about') {
      res.write(aboutHtml);
    }

    else if (req.url == "/blog") {
      res.write(blogHtml);
    }
    
    else if (req.url == "/contact") {
      res.write(contactHtml);
    }
    
    else if (req.url == "pricing") {
      res.write(pricingHtml);
    }
    
    else if (req.url == "/services") {
      res.write(servicesHtml);
    }
    
    else if (req.url == "/work") {
      res.write(workHtml);
    }
    
    else {
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.write(
        "<h3>This page doesn't exist</h3> <a href = '/'>Back to home page</a>"
      );
    }
    
    res.end()
})

module.exports={server}
const fs = require('fs');

const aboutHtml = fs.readFileSync('./HTML/about.html', "utf-8")
const blogHtml = fs.readFileSync('./HTML/blog.html', "utf-8")
const contactHtml = fs.readFileSync('./HTML/contact.html', "utf-8")
const indexHtml = fs.readFileSync('./HTML/index.html', "utf-8")
const pricingHtml = fs.readFileSync('./HTML/pricing.html', "utf-8")
const servicesHtml = fs.readFileSync('./HTML/services.html', "utf-8")
const workHtml = fs.readFileSync("./HTML/work.html", "utf-8");

const contentJson = {
    aboutHtml,
    blogHtml,
    contactHtml,
    indexHtml,
    pricingHtml,
    servicesHtml,
    workHtml
}



module.exports=contentJson
 
const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////////////////////
// FILES

// Synchronous code
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textInput)

// const textOutput = `We're outputting the same text: ${textInput}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOutput)
// console.log('File written')

// Asynchronous code - callback hell
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('err', err)
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//                 console.log('File written!')
//             })
//         })
//     })
// })


////////////////////////////////////////
// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const cardTemplate = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const productTemplate = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        const htmlCards = dataObj.map(product => replaceTemplate(cardTemplate, product)).join('')
        const output = overviewTemplate.replace('{%PRODUCT-CARDS%}', htmlCards)
        res.end(output)

    // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, { 'content-type': 'text/html' })
        const product = dataObj[query.id]
        const output = replaceTemplate(productTemplate, product)
        res.end(output)

    // API page
    } else if (pathname === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(data)

    // 404
    } else {
        res.writeHead(404)
        res.end('Page not found.')
    }
})
server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening on port 8000')
})
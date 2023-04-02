const http = require('http')
const fs = require('fs')
const path = require('path') // для формирования корректных путей
const express = require('express')

const PORT = 3000;

const server = express()
server.use(express.static("./pages"));

server.set('views', './');
server.set('view engine', 'ejs')
let data;

fs.readFile('./databases/database.json', 'utf8', (err, text) => {
    console.log(text)
    if(err){
        console.log(err)
    }
    else{
        data = text;
    }
    console.log(data);
})
let check = true;
server.get('*', (req, res) => {
   

    res.setHeader('Content-Type', 'text/html')

    switch (req.url) {
        case '/':
        case '/main':
        case '/home':
        case '/page4':
            res.status(200).render(path.resolve(__dirname, `./pages/page4.ejs`))
            res.end()
            break
        case '/page1':
            res.render(path.resolve(__dirname, `./pages/page1.ejs`), { data })
            res.statusCode = 200
            res.end()
            break
        case '/page2':
            res.statusCode = 301
            res.setHeader('Location', '/fixing')
            res.end()
        case '/fixing':
           res.render(path.resolve(__dirname, `./pages/fixing.ejs`))
            res.statusCode = 200
            res.end()
            break
        default:
            res.render(path.resolve(__dirname, `./pages/error.ejs`))
            res.statusCode = 404
            res.end()
            break
    }


})

server.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})
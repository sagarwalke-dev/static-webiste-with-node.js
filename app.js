//load modules
let basePath = __dirname;
const http = require('http');
const fs = require('fs');
const path = require('path');
//create server
http.createServer(function (req, res) {

    //404 page load
    let err = () => {
        let errorFile = fs.createReadStream('error.html');
        errorFile.pipe(res);
    }

    //load defualt home
    let loadHome = () => {
        let loadHome = fs.createReadStream('index.html');
        loadHome.pipe(res);
    }

    res.setHeader('Content-Type', 'text/html');
    let stream = fs.createReadStream(path.join(basePath, req.url));

    if (req.url == '/' || req.url == '/home') {
        loadHome();
    }
    stream.on('error', function () {
        res.writeHead(404);
        err();
    });

    stream.pipe(res);
    // res.end();


}).listen(5050);
console.log('http://localhost:5050/');



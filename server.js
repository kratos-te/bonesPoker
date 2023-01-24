var http = require('http');
const { parse } = require('url')
const express = require('express')

const next = require('next')
const port = process.env.PORT || 3000;//parseInt(process.env.PORT, 80) 
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    http.createServer((req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true)
            // handle(req, res, parsedUrl);
            handle(req, res, parsedUrl);
            // const { pathname, query } = parsedUrl

            // if (pathname === '/a') {
            //   app.render(req, res, '/', query)
            // } else {
            //   handle(req, res)
            // }
            // else if (pathname === '/b') {
            //   await app.render(req, res, '/b', query)
            // } 

        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
        // handle ....
    }).listen(port, err => {
        if (err) throw err
        console.log(`> Ready on localhost:${port}`)
    })
})
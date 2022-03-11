const jsonServer = require('json-server')
const express = require('express')
const path = require('path')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const root = __dirname + '/build'

const port = process.env.LEANCLOUD_APP_PORT || 3004

server.use(express.static(root, { maxAge: 86400000 }))
server.use(middlewares)
const reactRouterWhiteList = ['/create', '/edit/:id']
server.get(reactRouterWhiteList, (req, res) => {
    res.sendFile(path.resolve(root, 'index.html'))
})
server.use(router)
server.listen(port, () => {
    console.log('server is running at 3004');
})
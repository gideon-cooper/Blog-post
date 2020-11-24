const express = require('express')


const server = express()
server.use(express.json())

const PORT = process.env.PORT || 3001
server.listen(PORT, () => console.log("Server is listening on ", PORT))

module.exports = server
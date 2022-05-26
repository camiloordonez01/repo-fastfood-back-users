const { app } = require('./lib/infrastructure/webserver/server')

const port = process.env.PORT || 3000

// Server
app.listen(port, () => console.log(`Listening on: http://localhost:${port}`))

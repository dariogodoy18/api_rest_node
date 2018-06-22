const express = require('express')
const app = express()

//settings
app.set('port', process.env.PORT || 3000)

//midlewares
app.use(express.json())

//routes
app.use(require('./routes/exployees'))

//server starting
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})
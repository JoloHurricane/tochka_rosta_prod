let express = require('express')
let app = express()
let http  = require('http')
let fs = require('fs')
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')
const indexRoutes = require('./routes/index.routes')
const authRoutes = require('./routes/auth.routes')
const articlesRoutes = require('./routes/articles.routes')
const galleryCategoryRoutes = require('./routes/gallery.routes')
const uploadRoutes = require('./routes/upload.routes')
const orgRoutes = require('./routes/organization.routes')
const docRoutes = require('./routes/document.routes')
const eventsRoutes  = require('./routes/events.routes')
const aboutRoutes = require('./routes/about.routes')
const equipmentRoutes = require('./routes/equipment.routes')


const PORT = config.get('port')





var privateKey = fs.readFileSync( './ssl/localhost/18662638_localhost.key' );
var certificate = fs.readFileSync( './ssl/localhost/18662638_localhost.cert' );




async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true

        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
app.use(express.json({ extended: true }))


app.use('/api/auth', authRoutes)
app.use('/api/articles-edit',articlesRoutes)
app.use('/api/galleryCategory-edit',galleryCategoryRoutes)
app.use('/api/documents-edit',docRoutes)
app.use('/api/organization-edit',orgRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/events-edit',eventsRoutes)
app.use('/api/about-edit',aboutRoutes)
app.use('/api/equipment-edit',equipmentRoutes)

if (process.env.NODE_ENV==='production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

http.createServer({
    key: privateKey,
    cert: certificate
},app).listen(PORT,async()=>{
    
    
        try {
            await mongoose.connect(config.get("mongoUri"), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
    
            })
         console.log('server has been started')
    
} 
catch(e){
 console.log('server error, not start!!')
}
}
)

// start()

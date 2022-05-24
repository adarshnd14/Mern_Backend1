const app = require('./app.js')

// listening to the server
const PORT = process.env.PORT || 8001

app.listen(PORT,()=>{
    console.log(`Server listening at server ${PORT}`);
})

//multer -> library that can be used for uploading form data

import express from 'express';
import DB from './src/database';
import multer from 'multer';
import path from 'path';
const app = express();

const upload = multer({ dest: 'temp/' })

const { PORT } = process.env;

app.listen(PORT,()=>{
    console.log('server')
})

app.post('/data', upload.single('img'), (req, res)=>{
    if(!req.file)
        return res.send("dosya yok");
    const full_path = path.resolve("./temp", req.file.filename);
    res.json(full_path);
})

const db = DB(process.env.DB_NAME);
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Mongodb connected'));
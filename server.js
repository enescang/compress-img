import express from 'express';
import DB from './src/database';

const app = express();

const { PORT } = process.env;

app.listen(PORT,()=>{
    console.log('server')
})

const db = DB(process.env.DB_NAME);
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Mongodb connected'));
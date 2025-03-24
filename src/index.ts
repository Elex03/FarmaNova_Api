import express from 'express'
import cors from 'cors'
import appRouter from './router/'
import morgan from 'morgan'


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/apiFarmaNova', appRouter);
app.get('/favicon.ico', (_req, res) => {
    res.send('Hello');
})


app.listen(3000, () => {
    console.log('Api listen on 3000 port');
})
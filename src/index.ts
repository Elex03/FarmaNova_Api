import express from 'express'
import cors from 'cors'
import appRouter from './router/'
import morgan from 'morgan'


const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/apiFarmaNova', appRouter);


app.listen(3000, () => {
    console.log('Api listen on 3000 port');
})
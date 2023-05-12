//__path = process.cwd()
import express from 'express';

const app = express();
import cors from 'cors';

//Importing Global functions & utils
import {
    fetchSchedule
} from './scraper/scrape.js';

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json())
app.set("json spaces",2)

import gogoRoutes from './Routes/Gogoanime.js';
import animixRoutes from './Routes/Animixplay.js';
import zoroRoutes from './Routes/Zoro.js';
import allanimeRoutes from './Routes/Allanime.js';
import animepaheRoutes from './Routes/Animepahe.js';
import yugenRoutes from './Routes/Yugen.js';

app.use('/gogoanime', gogoRoutes);
app.use('/animix', animixRoutes);
app.use('/zoro', zoroRoutes);
app.use('/allanime', allanimeRoutes);
app.use('/animepahe', animepaheRoutes);
app.use('/yugen', yugenRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('TrevoAniApi is a anime streaming and discovery api built using NodeJS and express that scrapes Gogoanime and some other services to return data')
});

app.get('/schedule', async (req, res) => {
    const data = await fetchSchedule();
    res.json(data).status(200);
})

//Start the web-server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`)
});

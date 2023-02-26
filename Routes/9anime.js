import express from 'express';
const router = express.Router();

import {
    fetchSearch9anime,
    fetch9animeInfo,
    fetch9animeEpisodeSource
} from '../scraper/scrape.js';

router.get('/', (req, res) => {

});

router.get('/search', async (req, res) => {
    const keyw = req.query.keyw;

    const data = await fetchSearch9anime({ keyw });
    res.json(data).status(200);
});

router.get('/info/:animeId', async (req, res) => {
    const animeId = req.params.animeId;

    const data = await fetch9animeInfo({ animeId });
    res.json(data).status(200);
});

router.get('/watch/:episodeId', async (req, res) => {
    const episodeId = req.params.episodeId;

    const data = await fetch9animeEpisodeSource({ episodeId });
    res.json(data).status(200)
});

export default router;
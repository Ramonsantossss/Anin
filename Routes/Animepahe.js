import express from 'express';
const router = express.Router();

import {
    fetchSearchAnimepahe,
    fetchAnimepaheInfo,
    fetchAnimepaheEpisodeSource
} from '../scraper/scrape.js';

router.get('/', (req, res) => {
    res.send({ routes: ['/search?keyw={keyword}', '/info/:animeId', '/watch/:episodeId'], website: 'https://animepahe.com/' })
})

router.get('/search', async (req, res) => {
    const keyw = req.query.keyw;

    const data = await fetchSearchAnimepahe({ keyw });
    res.json(data).status(200)
})

router.get('/info/:animeId', async (req, res) => {
    const animeId = req.params.animeId;
    const page = req.query.page;

    const data = await fetchAnimepaheInfo({ animeId, page });
    res.json(data).status(200);
});

router.get('/watch/:episodeId', async (req, res) => {
    const episodeId = req.params.episodeId;

    const data = await fetchAnimepaheEpisodeSource({ episodeId });
    res.json(data).status(200);
});


export default router;
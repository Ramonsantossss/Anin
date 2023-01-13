import express from 'express';
const router = express.Router();

import {
    fetchSearchYugen,
    fetchYugenAnimeInfo,
    fetchYugenEpisodeSource
} from '../scraper/scrape.js';

router.get('/search', async (req, res) => {
    const keyw = req.query.keyw;

    const data = await fetchSearchYugen({ keyw });
    res.json(data).status(200);
});

router.get('/info/:animeId', async (req, res) => {
    const animeId = req.params.animeId;

    const data = await fetchYugenAnimeInfo({ animeId });
    res.json(data).status(200);
});

router.get('/watch/:episodeId', async (req, res) => {
    const episodeId = req.params.episodeId;

    const data = await fetchYugenEpisodeSource({ episodeId });
    res.json(data).status(200);
})

export default router;
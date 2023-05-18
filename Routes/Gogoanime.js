import express from "express";
const router = express.Router();

import {
    fetchSearchGogo,
    fetchGogoRecentEpisodes,
    fetchGogoAnimeInfo,
    fetchGogoanimeEpisodeSource,
    episod
} from "../scraper/scrape.js";

router.get('/', (req, res) => {
    res.send({
        routes: ['/recentes', '/search?keyw={keyword}', '/info/:animeId', '/watch/:episodeId']
    })
})

router.get('/search', async (req, res) => {
    const keyw = req.query.keyw;
    const page = req.query.page;

    const data = await fetchSearchGogo({ keyw: keyw, page: page })
    res.json(data).status(200)
});

router.get('/recent-episodes', async (req, res) => {
    const page = req.query.page;
    const type = req.query.type;

    const data = await fetchGogoRecentEpisodes({ page, type });
    res.json(data).status(200)
});

router.get('/epis/:animeId', async (req, res) => {
    const animeId = req.params.animeId;

    const data = await episod({ animeId });
    res.json(data).status(200);
});

router.get('/info/:animeId', async (req, res) => {
    const animeId = req.params.animeId;

    const data = await fetchGogoAnimeInfo({ animeId });
    res.json([data]).status(200);
});


router.get('/popular', async (req, res) => {
fetch(encodeURI("https://animaster.onrender.com/api/popular/1"))
     .then(response => response.json())
     .then(data => {
     res.json(data.results).status(200);
     })
})

router.get('/watch/:episodeId', async (req, res) => {
    const episodeId = req.params.episodeId;

    const data = await fetchGogoanimeEpisodeSource({ episodeId });
    res.json([data]).status(200);
    /*
//app.get('/video',function(req, res) {
  const urlDoVideo = data.locationhd; 
    //res.json(data).status(200);
  res.send(`<video controls> <source src="${urlDoVideo}" type="video/mp4"></video>`); 
//});
*/
});

export default router;
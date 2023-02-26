import axios from 'axios';
import { load } from 'cheerio';

import { extractFilemoon } from '../../helper/filemoon.js';

const nineanimeBase = `https://9anime.pl`;
const nineanimeAjax = `${nineanimeBase}/ajax`;

export const fetchSearch9anime = async ({ keyw, list = [] }) => {
    try {
        if (!keyw) return {
            error: true,
            error_message: "No keyword provided"
        };
        let vrf = await vrfGen(keyw);
        const res = await axios.get(`${nineanimeAjax}/anime/search?keyword=${encodeURIComponent(keyw)}&vrf=${vrf}`);

        const $ = load(res.data.result.html);

        $('div.items > a.item').each((i, el) => {
            list.push({
                animeId: $(el).attr("href").split("/watch/")[1],
                animeTitle: $(el).find('div.info > div.name').text(),
                animeImg: $(el).find('div.poster > span > img').attr('src'),
                animeUrl: `${nineanimeBase}${$(el).attr("href")}`,
                score: $(el).find('div.meta > span.text-gray2').text().trim()
            })
        });

        return list;
    } catch (err) {
        return {
            error: true,
            error_message: err
        }
    }
};

export const fetch9animeInfo = async ({ animeId, list = {} }) => {
    try {
        if (!animeId) return {
            error: true,
            error_message: "No animeId provided"
        };

        const res = await axios.get(`${nineanimeBase}/watch/${animeId}`);
        const $ = load(res.data);

        let genre = [];
        $('div.bmeta > div.meta:nth-child(1) > div > span').last().find('a').each((i, el) => {
            genre.push($(el).text());
        });

        const id = $('#watch-main').attr('data-id');
        console.log(id)

        let vrf = await vrfGen(id);
        const episodeListAjax = await axios.get(`https://9anime.pl/ajax/episode/list/${id}?vrf=${vrf}`);

        const $$ = load(episodeListAjax.data.result);

        let episodes = [];
        $$('div.episodes > ul > li > a').each((i, el) => {
            episodes.push({
                episodeId: $(el).attr("data-ids").split(",")[0],
                epNum: $(el).attr('data-num'),
                episodeTitle: $(el).find('span.d-title').text(),
                isFiller: $(el).hasClass('filler')
            })
        })


        list = {
            animeId,
            animeTitle: $('#w-info > div.binfo > div.info > h1.title').text(),
            animeImg: $('#w-info > div.binfo > div.poster > span > img').attr('src'),
            synopsis: $('#w-info > div.binfo > div.info > div.synopsis > div.shorting > div.content').text().trim(),
            genre: genre,
            totalEpisodes: $$('div.episodes > ul > li').length,
            episodes: episodes
        };

        return list;

    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
};

export const fetch9animeEpisodeSource = async ({ episodeId }) => {
    try {
        if (!episodeId) return {
            error: true,
            error_message: "No episodeId provided"
        };

        let vrf = await vrfGen(episodeId);
        const res = await axios.get(`${nineanimeAjax}/server/list/${episodeId}?vrf=${vrf}`);
        const $ = load(res.data.result);

        let dataLinkId;

        $('div.servers > div.type > ul > li').each((i, el) => {
            if ($(el).text().toLowerCase() === "filemoon") {
                dataLinkId = $(el).attr('data-link-id')
            }
        });

        vrf = await vrfGen(dataLinkId)
        const serverEmbedLinkAjax = await axios.get(`${nineanimeAjax}/server/${dataLinkId}?vrf=${vrf}`);

        const embedUrl = await decrypt(serverEmbedLinkAjax.data.result.url);

        const sourcesI = await extractFilemoon(embedUrl);

        const sourceUrl = new URL(sourcesI);

        return {
            sources: sourceUrl.href
        };
    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
};

async function vrfGen(q) {
    const { data } = await axios.get(`https://proxy.vnxservers.com/vrf?query=${q}`)
    return data.url;
};

async function decrypt(q) {
    const { data } = await axios.get(`https://proxy.vnxservers.com/decrypt?query=${q}`)
    return data.url;
};
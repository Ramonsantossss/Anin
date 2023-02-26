import axios from "axios";
import { load } from 'cheerio';

export const extractFilemoon = async (embedUrl) => {
    let sources;

    const res = await axios.get(embedUrl);
    const $ = load(res.data);

    try {
        const evalFunc = $('script').last().prev().text().split("return p")
        evalFunc[0] += "sources=p;return p"
        const finalRes = evalFunc.join(" ");

        eval(finalRes)
    } catch (err) { }
    const sourceLink = sources.split("{file:\"")[1].split("\"}],image")[0]

    return sourceLink;
}
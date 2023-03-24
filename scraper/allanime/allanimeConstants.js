//All constants, variables and extensions for allanime scraping

const USER_AGENT = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36`;

//  --> only subs for now, will add dubs later


const recentEpisodeParams = {
    variables: {
        search: {
            sortBy: "Recent",
            allowAdult: true
        },
        limit: 26,
        page: 1,
        translationType: "sub",
        countryOrigin: "JP"
    },
    extensions: {
        persistedQuery: {
            version: 1,
            sha256Hash: "b645a686b1988327795e1203867ed24f27c6338b41e5e3412fc1478a8ab6774e"
        }
    }
}

const searchParams = (q) => {
    return {
        variables: {
            search: {
                allowAdult: true,
                query: q
            },
            limit: 30,
            page: 1,
            translationType: "sub"
        },
        extensions: {
            persistedQuery: {
                version: 1,
                sha256Hash: "b645a686b1988327795e1203867ed24f27c6338b41e5e3412fc1478a8ab6774e"
            }
        }
    }
}

const animeInfoParams = (id) => {
    return {
        variables: {
            _id: id
        },
        extensions: {
            persistedQuery: {
                version: 1,
                sha256Hash: "d6069285a58a25defe4a217b82140c6da891605c20e510d4683ae73190831ab0"
            }
        }
    }
}

const episodeListParams = (id, epNumStart, epNumEnd) => {
    return {
        variables: {
            showId: id,
            episodeNumStart: epNumStart,
            episodeNumEnd: Number(epNumEnd)
        },
        extensions: {
            persistedQuery: {
                version: 1,
                sha256Hash: "31cf94e101217bab1f65be244e37c2a925d6a335ca596972bbc34b4be1b21548"
            }
        }
    }
}

const sourceParams = (id, epNum) => {
    return {
        variables: {
            showId: id,
            translationType: "sub",
            episodeString: `${epNum}`
        },
        extensions: {
            persistedQuery: {
                version: 1,
                sha256Hash: "0ac09728ee9d556967c1a60bbcf55a9f58b4112006d09a258356aeafe1c33889"
            }
        }
    }
}

const headerAllanime = {
    "Host": "allanime.to",
    "User-Agent": USER_AGENT
};


export {
    recentEpisodeParams,
    searchParams,
    animeInfoParams,
    episodeListParams,
    sourceParams,
    headerAllanime
}
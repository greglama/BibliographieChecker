const fetch = require('node-fetch');
const url = require("url");

const CrossrefSearch = () =>{

    const baseUrl = "https://crossref.citation-api.com/query?search=";

    const getUrlSearch = query => baseUrl + url.parse(query).href

    // parse result and return an object with a display and a doi
    const getResults = async query => {
        const results = await fetch(getUrlSearch(query)).then(res => res.json());
        const format_result = results.results
        .map(e => {
            return {
                "display": e.display,
                "doi": e.data.doi.doi
            }
        });

        return format_result;
    } 
    
    return {
        "getResults":async (query) => await getResults(query)
    }
}

module.exports = CrossrefSearch;
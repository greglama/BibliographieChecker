const fetch = require('node-fetch');
const url = require("url");

//get all the liks to the pages of each resaurants
async function getDataFrom(query)
{
    const baseUrl = "https://crossref.citation-api.com/query?search=";

    const fetchUrl = baseUrl + url.parse(query).href;
    const response = await fetch(fetchUrl);
    const text = await response.text();

    const textObject = JSON.parse(text).results;

    return textObject.map(e => e.data);
}

async function fetchResults(query)
{
    const results = await getDataFrom(query);

    const displayResults = results.map(r => `${r.journal.title} (${r.pubjournal.day}/${r.pubjournal.month}/${r.pubjournal.year})\n${r.contributors.map(c => c.first + " " + c.middle + c.last).join(" - ")}\nDOI: ${r.doi.doi}\n`);

    displayResults.map(r => console.log(r));
    console.log("____________________________");
    console.log("End of results");
}

try
{
    const query = process.argv[2];
    fetchResults(query);
}
catch(e)
{
    console.log("The input query created an issue...");
}
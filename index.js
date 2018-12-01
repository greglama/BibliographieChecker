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

function resultParser(result)
{
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const title = result.journal.title;
    const day = result.pubjournal.day;
    const month = result.pubjournal.month;
    const year = result.pubjournal.year;
    const contributors = result.contributors.map(c => c.first + " " + c.middle + " " + c.last).join(" - ");
    const doi = result.doi.doi;

    let date = "";

    if(day != "" && month != "" && year != "")
    {
        date = `${months[parseInt(month)-1]} ${day} ${year}`;
    }
    else
    {
        date = year;
    }

    const link = title + 
    (date != "" ? " (" + date + ")": "") + 
    (contributors != "" ? "\n" + contributors:"") + 
    (doi != "" ? "\ndoi : " + doi : "");

    return link;
}

async function fetchResults(query)
{
    const results = await getDataFrom(query);
    const displayResults = results.map(r => resultParser(r));

    console.log("____________________________\n");
    displayResults.map(r => console.log(r + "\n"));
    //console.log(results);
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
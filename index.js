const CrossrefSearch = require("./CrossrefSearch")

async function fetchResults(query)
{
    // instance of crossref search
    const crossref = CrossrefSearch();

    const results = await crossref.getResults(query);

    console.log("|----------------------------");
    results.map(r => {
        console.log("\t\t" + r.display.title + " (year: " + r.display.year + ")\n");
        console.log("\tpublisher:\t\t" + r.display.publisher + "");
        console.log("\tDOI:\t\t\t" + r.doi);
        console.log("\tcan be found at:\t" + r.display.titleurl);
        console.log("\t____________________________\n");
    });
    console.log("|----------------------------");
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
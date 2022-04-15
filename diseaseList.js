let axios = require("axios");
let cheerio = require("cheerio");
let fs = require("fs");

axios.get("https://www.niams.nih.gov/health-topics/all-diseases").then(
  (response) => {
    if (response.status === 200) {
      var html = response.data;
      let $ = cheerio.load(html);
      var diseases = [];
      $('div[class="text-card clearfix"]').each(function (i, elem) {
        diseases[i] = {
          title: $(this).children("h3").text(),
          summary: $(this).children("span").text(),
        };
      });
      fs.writeFile(
        "data/diseases.json",
        JSON.stringify(diseases, null, 4),
        (err) => {
          console.log("File successfully written!");
        }
      );
    }
  },
  (error) => console.log(error)
);

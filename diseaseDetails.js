let axios = require("axios");
let cheerio = require("cheerio");
let fs = require("fs");

axios.get("https://www.niams.nih.gov/health-topics/acne").then(
  (response) => {
    if (response.status === 200) {
      var html = response.data;
      let $ = cheerio.load(html);
      var diseases = [];
      $('nav[class="header-mainnav navbar top-navigation menu--main"]').each(
        function (i, elem) {
          diseases[i] = {
            title: $(this).children("div").text(),
            summary: $(this).children("span").text(),
            // year: $(this)
            //   .children(".lister-item-header")
            //   .children(".lister-item-year")
            //   .text()
            //   .replace(/\(|\)/g, ""),
            // rating: $(this)
            //   .children("ipl-rating-star small")
            //   .children("ipl-rating-star__rating")
            //   .text(),
          };
        }
      );
      fs.writeFile(
        "data/details.json",
        JSON.stringify(diseases, null, 4),
        (err) => {
          console.log("File successfully written!");
        }
      );
    }
  },
  (error) => console.log(error)
);

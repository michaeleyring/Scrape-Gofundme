const cheerio = require('cheerio');
const moment = require('moment');

function extractDonationsFromHTML (html) {
  const $ = cheerio.load(html); 
  const goaldetails = $('.goal');
  let fundraising = '';
  let record = 1; // record count for matching goal (will be desktop and mobile)
  let fundsRaised = ""; // for the raw extract of funds raised
  let fundsRaised_formatted = ""; // for the formatted value
  let goalAmount = ""; // for the raw extract of the goal amount
  let goalAmount_formatted = "";
  
  goaldetails.each((i,el) => {
    // Extract information from each row of the goal (should be one)
    fundsRaised = $(el).find('strong').text().trim();
    let goalAmount = $(el).find('span').text().trim();
    fundsRaised_formatted = fundsRaised.slice(1);
    goalAmount_formatted = goalAmount.slice(4, 10);
    if (record == 1) {
      fundraising = '<div class="col-lg-3 col-6 text-center">' +
                    '  <span data-toggle="counter-up">' + fundsRaised_formatted + '</span>' +
                    '  <p>Troop 161 Memorial Fund<br>(dollars raised)</p>' +
                    '</div>' +
                    '<div class="col-lg-3 col-6 text-center">' +
                    '  <span data-toggle="counter-up">' + goalAmount_formatted + '</span>' +
                    '  <p>Troop 161 Memorial Fund<br>(goal amount)</p>' +
                    '</div>' + 
                    '<div class="col-lg-3 col-6 text-center">' + 
                    '  <span data-toggle="counter-up">20,773</span>' + 
                    '  <p>Name an AA 787 after Andrew<br>(petitioners)</p>' + 
                    '</div>' + 
                    '<div class="col-lg-3 col-6 text-center">' + 
                    '  <span data-toggle="counter-up">3</span>' + 
                    '  <p>Trips planned for the next 30 days</p>' + 
                    '</div>';
      console.log("Funds Raised:", fundsRaised_formatted);
      console.log("Goal Amount:", goalAmount_formatted);
    }
    record = record + 1;
  }); 
  
  return fundraising;
}

module.exports = {
  extractDonationsFromHTML
};
const requestax = require('axios');
const AWS = require('aws-sdk');
const {extractDonationsFromHTML} = require('./helpers');

module.exports.getgofundme = (event, context, callback) => {
    requestax('https://www.gofundme.com/troop161-andrew-memorial-and-support')
      .then(({data}) => {
          const donation_total = extractDonationsFromHTML(data);
          
          var response = {
            "isBase64Encoded": false,
            "headers": { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
            "statusCode": 200,
            "body": donation_total
          };
          callback(null, JSON.stringify(response));
      })
      .catch(callback);
  };



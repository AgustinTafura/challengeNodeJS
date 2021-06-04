const express_handlebars_sections = require('express-handlebars-sections');
const helpers = {};

helpers.section = express_handlebars_sections()


//get json
helpers.json = function(context) {
  return JSON.stringify(context);
};



module.exports = helpers;

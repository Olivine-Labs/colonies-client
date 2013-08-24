var moment = require('moment');

module.exports = function(handlebars){
  handlebars.registerHelper('fromNow', function(property) {
    var outputFormat = "HH:mm:ss",
        inputFormat = "X";

    var date = moment(this[property].toString(), inputFormat);
    return date.fromNow();
  });

  handlebars.registerHelper('formatDate', function(property, outputFormat) {
    var outputFormat = outputFormat || "HH:mm:ss",
        inputFormat = "X";

    var date = moment(this[property].toString(), inputFormat);

    return date.format(outputFormat);
  });

  handlebars.registerHelper('length', function(property, list) {
    if(!this[property]) return 0;

    return this[property].length;
  });
}


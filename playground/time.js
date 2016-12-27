var moment = require('moment');

var date = new Date().getTime();

console.log(moment(1234).add(1, 'year').format('MMM Do, YYYY - h:mm:ss A'));
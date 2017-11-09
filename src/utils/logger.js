const winston = require('winston');
const moment = require('moment');

const logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			level: 'silly',
			colorize: true,
			timestamp: function () {
				return moment().format('lll');
			},
			prettyPrint: true,
			humanReadableUnhandledException: true,
		})
	]
});

module.exports = logger;
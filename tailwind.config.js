const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
	content: [
		join(__dirname, 'apps/weather-forecast/src/**/!(*.stories|*.spec).{ts,html}'),
		join(__dirname, 'libs/weather/**/!(*.stories|*.spec).{ts,html}'),
		...createGlobPatternsForDependencies(__dirname),
	],
	theme: {
		extend: {},
	},
	plugins: [],
};

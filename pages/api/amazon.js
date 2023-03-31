const axios = require('axios');
const cheerio = require('cheerio');

export default async function handler(req, res) {
	const { query } = req.query;
	const { page } = req.query;
	const results = await startCrawling(query, page);
	res.status(200).json(results);
}

let userAgents = [
	'Mozilla/5.0 (Linux; U; Linux i555 x86_64; en-US) Gecko/20100101 Firefox/64.9',
	'Mozilla/5.0 (Linux; U; Android 4.4; LG-V400 Build/KOT49I) AppleWebKit/601.30 (KHTML, like Gecko) Chrome/52.0.2243.242 Mobile Safari/602.0 ',
	'Mozilla/5.0 (Linux; U; Android 7.0; LG-H930 Build/NRD90M) AppleWebKit/600.47 (KHTML, like Gecko) Chrome/51.0.3402.364 Mobile Safari/600.7 ',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_3_6; en-US) AppleWebKit/600.24 (KHTML, like Gecko) Chrome/52.0.2169.328 Safari/533',
	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1; like Mac OS X) AppleWebKit/535.47 (KHTML, like Gecko) Chrome/47.0.3577.322 Mobile Safari/600.4 ',
	'Mozilla/5.0 (Windows; Windows NT 6.1;) AppleWebKit/533.34 (KHTML, like Gecko) Chrome/52.0.3179.385 Safari/537',
	'Mozilla/5.0 (Windows; Windows NT 6.0; x64) AppleWebKit/533.41 (KHTML, like Gecko) Chrome/52.0.2422.291 Safari/534',
	'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_8; like Mac OS X) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/50.0.3494.383 Mobile Safari/536.5',
	'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 7_4_9; en-US) Gecko/20100101 Firefox/59.6',
	'Mozilla/5.0 (Linux i581 ) AppleWebKit/603.32 (KHTML, like Gecko) Chrome/51.0.2181.226 Safari/537',
];

setInterval(() => {
	USER_AGENT = userAgents[Math.floor(Math.random() * userAgents.length)];
	},60000);

let USER_AGENT = userAgents[Math.floor(Math.random() * userAgents.length)]; // get random user-agent from https://iplogger.org/useragents/?device=random&count=10

const ACCEPT_LANGUAGE = 'en-US,en;q=0.9';
const ACCEPT_ENCODING = 'gzip, deflate, br';
const REFERER = 'https://www.amazon.com/';

async function crawl(url, SEARCH_QUERY) {
	if(!SEARCH_QUERY) {
		return;
	}
	console.log(
		`New Search with Query: ${SEARCH_QUERY}; Page ${url.substring(
			url.indexOf('page=') + 5,
		)}`,
	);
	const html = await axios
		.get(url, {
			headers: {
				'User-Agent': USER_AGENT,
				'Accept-Language': ACCEPT_LANGUAGE,
				'Accept-Encoding': ACCEPT_ENCODING,
				Referer: REFERER,
				Connection: 'keep-alive',
				'Upgrade-Insecure-Requests': '1',
			},
		})
		.then((res) => res.data);
	const $ = cheerio.load(html);
	const items = $('#search .s-result-item');
	let data = [];

	// Extracting the domain from the URL
	const { protocol, host } = new URL(url);
	const domain = `${host}`;

	for (let i = 0; i < items.length; i++) {
		const item = $(items[i]);
		const name = item.find('h2 a').text().trim();
		const priceWhole = item
			.find('.a-price-whole')
			.first()
			.text()
			.replace(/,/g, '');
		const priceFraction = item
			.find('.a-price-fraction')
			.first()
			.text()
			.replace(/,/g, '');
		const priceStr = priceWhole + priceFraction;
		const price = parseFloat(priceStr);
		const url = item.find('h2 a').attr('href');
		const rating = item.find('.a-icon-star-small').attr('aria-label');
		const sponsored = item.hasClass('AdHolder') ? true : false;
		const position = i + 1;
		const img = item.find('.s-image').attr('src');
		if (name && price && url) {
			data.push({
				position,
				name,
				price,
				rating,
				sponsored,
				img,
				url: `https://www.amazon.com${url}`,
			});
		}
	}
	let numOfPages = Number(
		$('span.s-pagination-item.s-pagination-disabled').last().text(),
	);
	while (data.length < 1) {
		data = await crawl(url, SEARCH_QUERY);
	}
	return { data, numOfPages };
}

async function startCrawling(query, page) {
	let url = `https://www.amazon.com/s?k=${encodeURI(query)}&page=${page}`;
	let data = await crawl(url, query);
	return data;
}

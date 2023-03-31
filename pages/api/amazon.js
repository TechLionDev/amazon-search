const axios = require('axios');
const cheerio = require('cheerio');

export default async function handler(req, res) {
	const { query } = req.query;
	const { page } = req.query;
	const results = await startCrawling(query, page);
	res.status(200).json(results);
}


let USER_AGENT = 'Mozilla/5.0 (Windows; Windows NT 10.1; WOW64; en-US) AppleWebKit/537.34 (KHTML, like Gecko) Chrome/50.0.2785.256 Safari/603' // get random user-agent from https://iplogger.org/useragents/?device=random&count=10

const ACCEPT_LANGUAGE = 'en-US,en;q=0.9';
const ACCEPT_ENCODING = 'gzip, deflate, br';
const REFERER = 'https://www.amazon.com/';

async function crawl(url, SEARCH_QUERY) {
	if(!SEARCH_QUERY) {
		return;
	}
	if(!SEARCH_QUERY.trim()) {
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
	if (data.length < 1) {
		data = await crawl(url, SEARCH_QUERY);
	}
	return { data, numOfPages };
}

async function startCrawling(query, page) {
	let url = `https://www.amazon.com/s?k=${encodeURI(query)}&page=${page}`;
	let data = await crawl(url, query);
	return data;
}

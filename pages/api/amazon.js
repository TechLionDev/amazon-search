const axios = require('axios');
const cheerio = require('cheerio');

const USER_AGENT =
	'Mozilla/5.0 (Linux i646 ; en-US) Gecko/20130401 Firefox/73.6'; // get random user-agent from https://iplogger.org/useragents/?device=random&count=10
const ACCEPT_LANGUAGE = 'en-US,en;q=0.9';
const ACCEPT_ENCODING = 'gzip, deflate, br';
const REFERER = 'https://www.amazon.com/';

async function crawl(url, SEARCH_QUERY) {
	console.log(`Crawling: ${url}`);
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
	const data = [];

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
	return data;
}

export async function startCrawling(query) {
    let results = await crawl(`https://www.amazon.com/s?k=${encodeURI(query)}`, query);
    return results;
}
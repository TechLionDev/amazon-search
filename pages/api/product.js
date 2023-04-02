const axios = require('axios');
import randUserAgent from 'rand-user-agent';
const cheerio = require('cheerio');

export default async function handler(req, res) {
	const { url } = req.query;
	console.log(url);
	const results = await startCrawling(url);
	res.status(200).json(results);
}

let USER_AGENT = randUserAgent('desktop'); // get random user-agent from https://iplogger.org/useragents/?device=random&count=10

const ACCEPT_LANGUAGE = 'en-US,en;q=0.9';
const ACCEPT_ENCODING = 'gzip, deflate, br';
const REFERER = 'https://www.amazon.com/';

async function crawl(url) {
	console.log(`Crawling ${url}`);
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
	let data;

	// Extracting the domain from the URL
	const { protocol, host } = new URL(url);
	const domain = `${host}`;
	const item = $('div#dp-container');
	const name = item.find('span#productTitle').text().trim();
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
	const img = item.find('img#landingImage').attr('src');
	const rating = item.find('span[data-hook="rating-out-of-text"]').text();

	const reviews = [];

	$('.a-section.review').each((i, elem) => {
		const title = $(elem).find('.a-size-base.review-title span').text().trim();
		const body = $(elem)
			.find('.a-size-base.review-text')
			.text()
			.trim()
			.replace('Read more', '');
		const date = $(elem)
			.find('.a-size-base.a-color-secondary.review-date')
			.text()
			.trim();
		const rating = $(elem).find('a.a-link-normal').attr('title');
		reviews.push({
			title,
			body,
			date,
			rating,
		});
	});

	data = {
		name,
		price,
		img,
		rating,
		url,
		reviews,
	};

	return data;
}

async function startCrawling(pUrl) {
	let url = `${decodeURIComponent(pUrl)}`;
	
	let data = await crawl(url);
	return data;
}

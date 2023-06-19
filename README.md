# Amazon Search

Amazon Search is a powerful tool that allows you to quickly and easily find products on Amazon. With just a few clicks, you can search Amazon's vast inventory and get detailed information on products that interest you. Whether you're looking for electronics, home goods, or anything in between, Amazon Search makes it easy to find what you're looking for. Accessible as a website, it's user-friendly and requires no programming knowledge. Try it out today and experience the convenience of Amazon without the ads. Search for yourself!

## Demo

Check out the live demo [here](https://amazon-search.techlion.dev).

## Screenshots

![project-screenshot](https://i.imgur.com/WC9BZDE.png)
---
![project-screenshot](https://i.imgur.com/U6JlIGm.png)
---
![project-screenshot](https://i.imgur.com/vTzoYmD.png)
---
![project-screenshot](https://i.imgur.com/LgDVhx8.png)
---

## Features

Here are some of the project's best features:

* Ad-Free Search
* Clean UI
* Open-Source
* Free

## Installation

To get started with the project, clone the repository and install the dependencies:

```sh
git clone https://github.com/TechLionDev/amazon-search
cd amazon-search
yarn install
```

To run the development server:

```sh
yarn dev
```

## API

Amazon Search provides an API endpoint that allows you to programmatically search for products on Amazon. The API endpoint URL is as follows:

```
https://amazon-search.techlion.dev/api/amazon?query=YOUR_QUERY_HERE&page=RESULTS_PAGE_NUM
```


To use the API, replace `YOUR_QUERY_HERE` with your desired search query and `RESULTS_PAGE_NUM` with the page number of the search results you want to retrieve.

### API Response

The API response is in JSON format and consists of the following structure:

```json
{
  "data": [
    {
      "position": 3,
      "name": "Electronic Remote Control Rat, Simulation Mouse Toy for Cat Dog Kid, Gray",
      "price": 6.56,
      "sponsored": false,
      "img": "https://m.media-amazon.com/images/I/41NGWSthWHL._AC_UL400_.jpg",
      "url": "https://www.amazon.com/Forum-Novelties-Electronic-Control-Simulation/dp/B074KV957X/ref=sr_1_1?keywords=toys&qid=1687195879&sr=8-1"
    },
    {
      "position": 4,
      "name": "Kids Writing Tablet, Hockvill Toys for 3 4 5 6 7 Year Old Girls Boys, 8.8 Inch Colorful Doodle Board for Toddlers, Reusable Electronic Drawing Pad, Educational & Learning Birthday Gift for Children",
      "price": 9.99,
      "sponsored": false,
      "img": "https://m.media-amazon.com/images/I/81u8KzyOAJL._AC_UL400_.jpg",
      "url": "https://www.amazon.com/Hockvill-Colorful-Toddlers-Electronic-Educational/dp/B0B9G2SJVX/ref=sr_1_2?keywords=toys&qid=1687195879&sr=8-2"
    }
  ],
  "numOfPages": 7
}
```

The response includes the following information for each product:

`position`: The position of the product in the search results.
`name`: The name or title of the product.
`price`: The price of the product.
`sponsored`: A boolean value indicating whether the product is sponsored or not.
`img`: The URL of the product image.
`url`: The URL of the product on Amazon.

## Contributing

Contributions are always welcome and appreciated! If you would like to contribute to the project, please follow these steps:

1. Fork the project
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## Built With

Technologies used in the project:

* Node.js
* Next.js
* Axios
* Cheerio

## License

This project is licensed under the BSD 3 Clause. See the [LICENSE](./LICENSE) file for more information.

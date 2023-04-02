import Review from '@/components/Review';

const ProductPage = ({ data }) => {
	console.log(data);
	let ProductName = data.name;
	let ProductPrice = data.price;
	let PrimaryImage = data.img;
	let ProductRating = data.rating;
	let ProductUrl = data.url;
	let ProductReviews = data.reviews;

	return (
		<>
			<div className='flex flex-col items-center justify-center gap-4 p-8'>
				<div className='flex flex-col md:flex-row'>
					<div className='md:w-1/2'>
						<img
							className='object-contain w-full h-64 md:h-full max-h-[400px]'
							src={PrimaryImage}
							alt={ProductName}
						/>
					</div>
					<div className='flex flex-col justify-center p-6 md:w-1/2'>
						<h1 className='mb-2 text-2xl font-bold'>{ProductName}</h1>
						<p className='text-xl font-semibold text-gray-800'>
							${ProductPrice}
						</p>
						<div className='flex items-center mt-2 mb-4'>
							<svg
								className='w-4 h-4 mr-2 text-yellow-500 fill-current'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'>
								<path d='M10 .3l2.928 6.498 6.518.948-4.727 4.672 1.116 6.506L10 15.319l-5.835 3.607 1.116-6.506L.554 7.746l6.518-.948L10 .3z' />
							</svg>
							<span className='mr-2 text-yellow-500'>{ProductRating}</span>
						</div>
						<a
							className='px-4 py-2 font-bold text-center text-white bg-blue-500 rounded hover:bg-blue-700'
							href={ProductUrl}
							target='_blank'
							rel='noopener noreferrer'>
							Buy Now
						</a>
					</div>
				</div>
				{ProductReviews.length > 0 &&
					ProductReviews.map((review) => (
						<Review
							key={review.id}
							title={review.title}
							rating={review.rating}
							body={review.body}
							date={review.date}
						/>
					))}
			</div>
		</>
	);
};

export default ProductPage;

export async function getServerSideProps(context) {
	const { url } = context.query;
	const { req } = context;
	const protocol = req.headers['x-forwarded-proto'] || 'http'; // get protocol from headers, default to http
	const host = req.headers['x-forwarded-host'] || req.headers.host; // get host from headers, or fallback to req.headers.host
	const hostname = `${protocol}://${host}`; // construct the full hostname

	const res = await fetch(`${hostname}/api/product?url=${url}`);
	const data = await res.json();

	return {
		props: {
			data,
		},
	};
}

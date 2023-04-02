const Review = ({ title, rating, body, date }) => {
	return (
		<>
			<div className='w-full overflow-hidden bg-white rounded-lg shadow-md'>
				<div className='px-6 py-4 border-b border-blue-500'>
					<h2 className='mb-2 text-xl font-semibold'>{title}</h2>
					<div className='flex items-center'>
						<svg
							className='w-4 h-4 mr-1 text-yellow-500 fill-current'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M10 .3l2.928 6.498 6.518.948-4.727 4.672 1.116 6.506L10 15.319l-5.835 3.607 1.116-6.506L.554 7.746l6.518-.948L10 .3z' />
						</svg>
						<span className='font-semibold text-yellow-500'>{rating}</span>
					</div>
					<p className='text-sm text-gray-600'>
						{date}
					</p>
				</div>
				<div className='px-6 py-4'>
					<p className='text-base text-gray-700'>
						{body}
					</p>
				</div>
			</div>
		</>
	);
};

export default Review;

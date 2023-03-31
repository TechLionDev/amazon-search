const ItemCard = ({ item }) => {
	let priceWhole = item.price.toString().split('.')[0];
	let priceDecimal = item.price.toString().split('.')[1];
	return (
		<>
			<div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center h-full justify-between'>
				<div className="items-center flex h-full">
                    <a href={item.url} target='_blank' rel='noopener noreferrer'>
                        <img className='p-8 rounded-t-lg' src={item.img} alt={item.name} />
                    </a>
                </div>
				<div className='px-5 pb-5'>
					<a href={item.url} target='_blank' rel='noopener noreferrer'>
						<h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-3'>
							{item.name}
						</h5>
					</a>
					<div className='flex items-center justify-between py-4'>
						<span className='text-3xl font-bold text-gray-900 dark:text-white'>
							${priceWhole}.
							<span className='text-xl font-semibold text-gray-900 dark:text-white'>
								{priceDecimal}
							</span>
						</span>
						<a
							href={item.url}
							className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							target='_blank'
							rel='noopener noreferrer'>
							View Details
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItemCard;
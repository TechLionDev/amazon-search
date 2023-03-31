import { useState } from 'react';

export default function Pagination({ page, setPage, numOfPages }) {
	if (numOfPages === 0) {
		return;
	}
	const [currentPage, setCurrentPage] = useState(1);
	const pageElms = [];

	for (let i = 1; i <= numOfPages; i++) {
		pageElms.push(
			<li key={i}>
				<a
                    onClick={() => {
                        setPage(i);
                        setCurrentPage(i);
                    }}
					aria-current={currentPage == i ? 'page' : false}
					className={`px-3 py-2 rounded-lg duration-150 hover:text-white hover:bg-indigo-600 ${
						currentPage == i ? 'bg-indigo-600 text-white font-medium' : ''
					}`}>
					{i}
				</a>
			</li>,
		);
	}

	return (
		<div className='max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8'>
			<div className='hidden justify-between text-sm md:flex'>
				<div>
					Page {page} of {numOfPages}
				</div>
				<div className='flex items-center gap-12' aria-label='Pagination'>
					<a
						onClick={() => {
							setPage(page - 1);
							setCurrentPage(page - 1);
						}}
						className='hover:text-indigo-600'>
						Previous
					</a>
					<ul className='flex items-center gap-1'>{pageElms}</ul>
					<a
						onClick={() => {
							setPage(page + 1);
							setCurrentPage(page + 1);
						}}
						className='hover:text-indigo-600'>
						Next
					</a>
				</div>
			</div>
			{/* On mobile version */}
			<div className='flex items-center justify-between text-sm text-gray-600 font-medium md:hidden'>
				<a
					onClick={() => {
						setPage(page - 1);
						setCurrentPage(page - 1);
					}}
					className='px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50'>
					Previous
				</a>
				<div className='font-medium'>
					Page {page} of {numOfPages}
				</div>
				<a
					onClick={() => {
						setPage(page + 1);
						setCurrentPage(page + 1);
					}}
					className='px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50'>
					Next
				</a>
			</div>
		</div>
	);
}

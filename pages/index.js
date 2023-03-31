import ItemCard from '@/components/ItemCard';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination';

const Home = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState('');
	const [numOfPages, setNumOfPages] = useState(0);
	const [pageSwitch, setPageSwitch] = useState(false);

  const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

	useEffect(() => {
		async function fetchData() {
			setPageSwitch(true);
			setLoading(true);
			let fres = await fetch(`/api/amazon?query=${query}&page=${page}`);
			let results = await fres.json();
			setData(results.data);
			setNumOfPages(results.numOfPages);
			setLoading(false);
			setPageSwitch(false);
    }
    fetchData();
    scrollToTop();
	}, [page]);

	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		let fres = await fetch(`/api/amazon?query=${query}&page=${page}`);
		let results = await fres.json();
		scrollToTop();
		setData(results.data);
		setNumOfPages(results.numOfPages);
		console.log(results);
		setLoading(false);
	}
	return (
		<>
			<div className='flex w-full flex-col gap-8'>
				<h1 className='text-center text-6xl font-black mt-4'>Amazon Search</h1>
				<div class='sticky top-2'>
					<form
						onSubmit={handleSubmit}
						className='flex items-center justify-center bg-gray-50 shadow-lg rounded-lg p-1 md:mx-24 mx-6'>
						<input
							onChange={(e) => setQuery(e.target.value)}
							value={query}
							type='text'
							required
							id='query'
							name='query'
							placeholder='Search For Anything...'
							className='text-gray-500 w-full p-2 outline-none bg-inherit'
						/>
						<button className='p-2 px-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 duration-150 outline-none shadow-md focus:shadow-none sm:px-4'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
								class='feather feather-search'>
								<circle cx='11' cy='11' r='8'></circle>
								<line x1='21' y1='21' x2='16.65' y2='16.65'></line>
							</svg>
						</button>
					</form>
				</div>
				<div className=''>
					<div className='flex gap-4 flex-wrap justify-center'>
						{data.map((item, index) => {
							return (
								<>
									<div className='flex'>
										<ItemCard item={item} key={index} />
									</div>
								</>
							);
						})}
					</div>
				</div>
				<div className='m-2 p-4'>
					<Pagination page={page} setPage={setPage} numOfPages={numOfPages} />
				</div>
			</div>
		</>
	);
};

export default Home;

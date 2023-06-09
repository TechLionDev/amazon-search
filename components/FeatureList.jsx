import React from 'react';

const FeatureList = ({ features }) => (
	<ul className='px-6 list-none list-inside'>
		{features.map((feature, index) => (
			<>
				<div className='flex items-center gap-8'>
					<div className='text-green-600'>
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
							class='feather feather-check-circle'>
							<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
							<polyline points='22 4 12 14.01 9 11.01'></polyline>
						</svg>
					</div>
					<li key={index} className='py-2 mb-2'>
						{feature}
					</li>
				</div>
			</>
		))}
	</ul>
);

export default FeatureList;

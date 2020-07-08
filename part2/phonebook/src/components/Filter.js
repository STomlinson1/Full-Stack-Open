import React from 'react';

export default function Filter({ filter, onFilterChange }) {
	return (
		<div>
			filter shown with <input value={filter} onChange={onFilterChange} />
		</div>
	);
}

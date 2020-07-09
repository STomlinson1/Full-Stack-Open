import React from 'react';

export default function Search({ searchTerm, searchInputChange }) {
	return (
		<div>
			<input value={searchTerm} onChange={searchInputChange} />
		</div>
	);
}

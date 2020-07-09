import React, { useState } from 'react';

import CountryCard from './CountryCard';

export default function CountryItem({ country }) {
	const [ show, setShow ] = useState(false);

	const onClick = () => {
		setShow(!show);
	};

	return (
		<div>
			{country.name}
			<button onClick={onClick}>{show ? 'close' : 'show'}</button>
			<div>{show ? <CountryCard {...country} /> : undefined}</div>
		</div>
	);
}

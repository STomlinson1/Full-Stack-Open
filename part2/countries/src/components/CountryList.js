import React from 'react';

import CountryItem from './CountryItem';

export default function CountryList({ countries }) {
	return countries.map((country) => <CountryItem key={country.name} country={country} />);
}

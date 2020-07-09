import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import CountryCard from './components/CountryCard';
import CountryList from './components/CountryList';

export default function App() {
	const [ countries, setCountries ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

	const searchInputChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const conditionalRender = (countryArr) => {
		if (countryArr.length > 10) return <div>Too many matches, specify another filter</div>;
		else if (countryArr.length > 1) return <CountryList countries={countryArr} />;
		else if (countryArr.length === 1) {
			const [ { name, capital, population, languages, flag } ] = countryArr;
			return <CountryCard name={name} capital={capital} population={population} languages={languages} flag={flag} />;
		} else return <div>No results, try another filter</div>;
	};

	return (
		<React.Fragment>
			<Search searchTerm={searchTerm} searchInputChange={searchInputChange} />
			{conditionalRender(filteredCountries)}
		</React.Fragment>
	);
}

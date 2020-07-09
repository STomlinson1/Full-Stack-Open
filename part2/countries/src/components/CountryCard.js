import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Weather from './Weather';

export default function CountryCard(props) {
	const { name, capital, population, languages, flag } = props;
	const api_key = process.env.REACT_APP_API_KEY;
	const [ weather, setWeather ] = useState(false);
	const [ weatherData, setWeatherData ] = useState({});

	useEffect(() => {
		axios
			.get(`http://api.weatherstack.com/current`, {
				params : {
					access_key : api_key,
					query      : `${capital}, ${name}`
				}
			})
			.then((response) => {
				setWeatherData(response.data);
				setWeather(true);
			});
	}, []);

	return (
		<div>
			<h2>{name}</h2>
			<div>capital: {capital}</div>
			<div>population: {population}</div>
			<h3>Languages</h3>
			<ul>{languages.map((language) => <li key={language.name}>{language.name}</li>)}</ul>
			<img src={flag} style={{ width: '250px' }} />
			{weather ? <Weather data={weatherData} capital={capital} /> : undefined}
		</div>
	);
}

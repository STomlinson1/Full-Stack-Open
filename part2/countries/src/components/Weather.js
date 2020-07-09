import React from 'react';

export default function Weather({ data, capital }) {
	const { current: { temperature, wind_speed, wind_dir, weather_icons } } = data;

	return (
		<div>
			<h3>Weather in {capital}</h3>
			<div>
				<strong>temperature: </strong>
				{temperature} Celcius
			</div>
			<div>
				<img src={weather_icons[0]} />
			</div>
			<div>
				<strong>wind: </strong> {wind_speed} mph direction {wind_dir}
			</div>
		</div>
	);
}

import React from 'react';

const Total = ({ parts }) => {
	const exerciseTotal = parts.reduce((accumulator, { exercises }) => {
		return accumulator + exercises;
	}, 0);

	return (
		<p>
			<strong>Total of {exerciseTotal}</strong>
		</p>
	);
};

export default Total;

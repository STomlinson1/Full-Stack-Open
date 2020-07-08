import React from 'react';

export default function PersonList({ filteredPersons }) {
	return (
		<div>
			<h2>Numbers</h2>
			{filteredPersons.map((person) => (
				<div key={person.name}>
					{person.name} {person.number}
				</div>
			))}
		</div>
	);
}

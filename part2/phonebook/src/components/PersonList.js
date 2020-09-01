import React from 'react';

export default function PersonList({ filteredPersons, removeEntry }) {
	return (
		<div>
			<h2>Numbers</h2>
			{filteredPersons.map((person) => (
				<div key={person.name}>
					{person.name} {person.number}
					<button onClick={() => removeEntry(person.id, person.name)}>Delete</button>
				</div>
			))}
		</div>
	);
}

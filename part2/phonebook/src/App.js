import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonList from './components/PersonList';
import PersonForm from './components/PersonForm';

export default function App() {
	const [ persons, setPersons ] = useState([]);
	const [ newName, setNewName ] = useState('');
	const [ newPhoneNumber, setPhoneNumber ] = useState('');
	const [ filter, setFilter ] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			setPersons(response.data);
		});
	}, []);

	const onFormSubmit = (e) => {
		e.preventDefault();

		const existInArr = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());

		if (!existInArr) {
			const newPersonObject = {
				name   : newName,
				number : newPhoneNumber
			};

			setPersons([ ...persons, newPersonObject ]);
		} else {
			alert(`${newName} is already added to the phonebook`);
		}

		setNewName('');
		setPhoneNumber('');
	};

	const onNameInputChange = (e) => {
		setNewName(e.target.value);
	};

	const onPhoneNumberInputChange = (e) => {
		setPhoneNumber(e.target.value);
	};

	const onFilterChange = (e) => {
		setFilter(e.target.value);
	};

	const filteredPersons = filter ? persons.filter((person) => person.name.toLowerCase().includes(filter)) : persons;

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter filter={filter} onFilterChange={onFilterChange} />
			<PersonForm
				onFormSubmit={onFormSubmit}
				newName={newName}
				onNameInputChange={onNameInputChange}
				newPhoneNumber={newPhoneNumber}
				onPhoneNumberInputChange={onPhoneNumberInputChange}
			/>
			<PersonList filteredPersons={filteredPersons} />
		</div>
	);
}

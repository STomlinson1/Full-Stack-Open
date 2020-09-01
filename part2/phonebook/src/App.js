import React, { useState, useEffect } from 'react';
import phoneService from './services/phonebook';

import Filter from './components/Filter';
import PersonList from './components/PersonList';
import PersonForm from './components/PersonForm';
import Notfication from './components/Notification';
import ErrorMessage from './components/ErrorMessage';

import './index.css';

export default function App() {
	const [ persons, setPersons ] = useState([]);
	const [ newName, setNewName ] = useState('');
	const [ newPhoneNumber, setPhoneNumber ] = useState('');
	const [ filter, setFilter ] = useState('');
	const [ notificationMessage, setNotificationMessage ] = useState(null);
	const [ errorMessage, setErrorMessage ] = useState(null);

	useEffect(() => {
		phoneService.getAll().then((phoneList) => {
			setPersons(phoneList);
		});
	}, []);

	const onFormSubmit = (e) => {
		e.preventDefault();

		const personExist = persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		);

		if (!personExist) {
			const newPersonObject = {
				name   : newName,
				number : newPhoneNumber
			};

			phoneService.create(newPersonObject).then((newPersonItem) => {
				setPersons([ ...persons, newPersonItem ]);

				setNotificationMessage(`Added ${newPersonItem.name}`);

				setTimeout(() => {
					setNotificationMessage(null);
				}, 5000);
			});
		} else {
			const message = `${personExist.name} is already added to phonebook, replace the old number with a new one?`;

			if (window.confirm(message)) {
				const newPersonObject = { ...personExist, number: newPhoneNumber };

				phoneService
					.updateNumber(personExist.id, newPersonObject)
					.then((response) => {
						setPersons(
							persons.map(
								(person) => (person.id !== response.id ? person : response)
							)
						);
					})
					.catch((error) => {
						setErrorMessage(
							`Information of ${personExist.name} has already been removed from server`
						);

						setTimeout(() => {
							setErrorMessage(null);
						}, 5000);
					});
			}
		}

		setNewName('');
		setPhoneNumber('');
	};

	const removeEntry = (id, name) => {
		if (window.confirm(`Delete ${name} ?`)) {
			phoneService
				.remove(id)
				.then(setPersons(persons.filter((person) => person.id !== id)));
		}
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

	const filteredPersons = filter
		? persons.filter((person) => person.name.toLowerCase().includes(filter))
		: persons;

	return (
		<div>
			<h1>Phonebook</h1>
			<Notfication message={notificationMessage} />
			<ErrorMessage message={errorMessage} />
			<Filter filter={filter} onFilterChange={onFilterChange} />
			<PersonForm
				onFormSubmit={onFormSubmit}
				newName={newName}
				onNameInputChange={onNameInputChange}
				newPhoneNumber={newPhoneNumber}
				onPhoneNumberInputChange={onPhoneNumberInputChange}
			/>
			<PersonList filteredPersons={filteredPersons} removeEntry={removeEntry} />
		</div>
	);
}

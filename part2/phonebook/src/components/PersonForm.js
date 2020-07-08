import React from 'react';

export default function PersonForm(props) {
	const { onFormSubmit, newName, onNameInputChange, newPhoneNumber, onPhoneNumberInputChange } = props;

	return (
		<form onSubmit={onFormSubmit}>
			<div>
				<h2>add a new</h2>
				<div>
					name: <input value={newName} onChange={onNameInputChange} />
				</div>
				<div>
					number: <input value={newPhoneNumber} onChange={onPhoneNumberInputChange} />
				</div>
			</div>
			<div>
				<button type="submit">add</button>
				<div>debug: {newName}</div>
			</div>
		</form>
	);
}

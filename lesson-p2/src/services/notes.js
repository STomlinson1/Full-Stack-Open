import axios from 'axios';
const baseUrl = 'https://nameless-earth-57479.herokuapp.com/api/notes';

const getAll = () => {
	const request = axios.get(baseUrl);
	const nonExisting = {
		id        : 100000,
		content   : 'this note is not saved to the server',
		data      : '2019-05-30T17:30:31.098Z',
		important : true
	};
	return request.then((response) => response.data.concat(nonExisting));
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request.then((response) => response.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

export default {
	getAll,
	create,
	update
};

const express = require('express');
const app = express();
const PORT = 3001;
const morgan = require('morgan');

// Middlewares
const requestLogger = (req, rep, next) => {
	console.log('Method:', req.method);
	console.log('Path:', req.path);
	console.log('Body:', req.body);
	console.log('-----');
	next();
};

const unknowEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

morgan.token('content', (req) => JSON.stringify(req.body));

//app.use(MIDDLEWARE) is how Middleware are taken into use
app.use(express.json());
app.use(
	morgan(`:method :url :status :res[content-length] - :response-time ms :content`)
);
// app.use(requestLogger);

let persons = [
	{
		name   : 'Arto Hellas',
		number : '04032',
		id     : 1
	},
	{
		name   : 'Ada Lovelace',
		number : '34343',
		id     : 2
	},
	{
		name   : 'Stephon T',
		number : '4343',
		id     : 3
	},
	{
		name   : 'Diana',
		number : '32432',
		id     : 4
	}
];

app.get('/api/persons', (req, res) => {
	res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((person) => id === person.id);

	if (!person) {
		res.sendStatus(404).end();
	}

	res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);

	persons = persons.filter((person) => person.id !== id);

	res.sendStatus(204).end();
});

app.get('/info', (req, res) => {
	res.send(
		`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    ${new Date()}
    </div>`
	);
});

app.post('/api/persons', (req, res) => {
	const body = req.body;
	console.log(body);

	if (!body.name || !body.number) {
		res.status(400).json({
			error : 'The Name or Number is missing'
		});
		return;
	}

	const exist = persons.find((person) => person.name === body.name);

	if (exist) {
		res.status(400).json({
			error : 'Name already exists'
		});
		return;
	}

	const newPerson = {
		name   : body.name,
		number : body.number,
		id     : generateId()
	};

	persons = persons.concat(newPerson);

	res.json(newPerson);
});

const generateId = () => {
	return Math.floor(Math.random() * 10000000000 + 1);
};

//Add middleware for unknow routes
app.use(unknowEndpoint);

app.listen(PORT);
console.log(`Server Running on Port ${PORT}`);

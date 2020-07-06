import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
	const [ selected, setSelected ] = useState(0);
	const [ votes, setVotes ] = useState(new Array(props.anecdotes.length).fill(0));

	const onNextClick = () => {
		const randomNum = Math.floor(Math.random() * props.anecdotes.length);
		setSelected(randomNum);
	};

	const onVoteClick = () => {
		const newVotes = [ ...votes ];
		newVotes[selected] += 1;
		setVotes(newVotes);
	};

	let greatest;
	let indexOfGreatest = 0;

	for (let x = 0; x < votes.length; x++) {
		if (!greatest || votes[x] > greatest) {
			greatest = votes[x];
			indexOfGreatest = x;
		}
	}

	return (
		<div>
			<h2>Anecdote of the Day</h2>
			<div>{props.anecdotes[selected]}</div>
			<div>{`has ${votes[selected]} votes`}</div>
			<button onClick={onVoteClick}>vote</button>
			<button onClick={onNextClick}>next anecdote</button>
			<h2>Anecdote with the most votes</h2>
			{props.anecdotes[indexOfGreatest]}
		</div>
	);
};

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

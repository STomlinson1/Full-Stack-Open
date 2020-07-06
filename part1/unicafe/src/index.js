import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, bad, neutral }) => {
	const totalRatings = good + bad + neutral;
	const percentPositive = good / totalRatings * 100;
	const averageScore = (good + -bad) / totalRatings;

	return (
		<div>
			<h2>Statistics</h2>
			{totalRatings ? (
				<table>
					<tbody>
						<Statistic value={good} text="good" />
						<Statistic value={neutral} text="neutral" />
						<Statistic value={bad} text="bad" />
						<Statistic value={totalRatings} text="all" />
						<Statistic value={averageScore ? averageScore : 0} text="average" />
						<Statistic value={`${percentPositive ? percentPositive : 0} %`} text="positive" />
					</tbody>
				</table>
			) : (
				<div>{`No feedback given`}</div>
			)}
		</div>
	);
};

const Statistic = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
	const [ good, setGood ] = useState(0);
	const [ neutral, setNeutral ] = useState(0);
	const [ bad, setBad ] = useState(0);

	const addGood = () => {
		setGood(good + 1);
	};

	const addNeutral = () => {
		setNeutral(neutral + 1);
	};

	const addBad = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<h2>Give Feedback</h2>
			<Button onClick={addGood} text="good" />
			<Button onClick={addNeutral} text="neutral" />
			<Button onClick={addBad} text="bad" />
			<Statistics good={good} bad={bad} neutral={neutral} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));

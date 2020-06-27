import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h1>{props.name}</h1>;

const Content = (props) => {
	const { parts } = props;
	return (
		<React.Fragment>
			<Part part={parts[0].name} exercises={parts[0].exercises} />
			<Part part={parts[1].name} exercises={parts[1].exercises} />
			<Part part={parts[2].name} exercises={parts[2].exercises} />
		</React.Fragment>
	);
};

const Part = (props) => (
	<p>
		{props.part} {props.exercises}
	</p>
);

const Total = (props) => {
	const [ exercise1, exercise2, exercise3 ] = props.parts;
	return (
		<p>
			Number of exercises{' '}
			{exercise1.exercises + exercise2.exercises + exercise3.exercises}
		</p>
	);
};

const App = () => {
	// const course = 'Half Stack application development';

	const course = {
		name  : 'Half Stack application development',
		parts : [
			{
				name      : 'Fundamentals of React',
				exercises : 10
			},
			{
				name      : 'Using props to pass data',
				exercises : 7
			},
			{
				name      : 'State of a component',
				exercises : 14
			}
		]
	};

	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import {NavLink} from 'react-router-dom';
import './DateBox.css';




const DateBox = (props)=> {
	return(
		<div class = 'DateBox'>
			<div class = 'Date'>{props.date}</div>
			<NavLink to ='/todo' className = 'Todo_link'>{props.todo}</NavLink>
			<NavLink to ='/newtodo' className = 'NewTodo_link'>New Todo</NavLink>
		</div>
	);
}

export default DateBox;

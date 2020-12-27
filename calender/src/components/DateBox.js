import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './DateBox.css';


class DateBox extends Component {

	render(){

		//get todo list
		var todo_list;
		if (this.props.todo){
			todo_list = this.props.todo.map((title) => {
				return(
					<NavLink to = {`/todo/${title[0]}`} className = 'Todo_link'>{title[1]}</NavLink>
					);
				}
			);
		}

		//get newtodo link
		const new_todo = this.props.date ?
		(<NavLink to ={`/newtodo/${this.props.year}/${this.props.month}/${this.props.date}`} className = 'NewTodo_link'>New Todo</NavLink>) : null;
		
		//inline style
		var dateStyle = {
			color: 'white',
			background: 'DarkSlateGray'
		}

		//if input == 0 -> change to blank box
		if(this.props.date === 0){
			delete dateStyle['color'];
			dateStyle['color'] = 'white';
			delete dateStyle['background'];
			dateStyle['background'] = 'white';
		}

		//return html
		return(
			<div class = 'DateBox'>
				<div class = 'Date' style={dateStyle}>
					{this.props.date}
				</div>
				{todo_list}
				{new_todo}
			</div>
		);
	}
}

export default DateBox;

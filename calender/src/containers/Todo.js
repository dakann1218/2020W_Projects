import React,{Component} from 'react';

import './Todo.css';

class Todo extends Component{
	state = {
		title:'',
		content:'',
	}

	clickSubmit = () =>{
		alert("Submitted");
	}


	render() {
		return(
			<div className = 'Todo'>
			<h1>Todo</h1>
			
			<label>Title</label>
			<input
			className = 'Title'
			value = {this.state.title}	//set state by title from redux|django
			onChange = {(event) => this.setState({title:event.target.value})}>
			</input>
			
			<label>Content</label>
			<textarea
			className = 'Content'
			value = {this.state.content}	//set state by title from redux|django
			onChange = {(event) => this.setState({title:event.target.value})}>
			</textarea>
			<button onClick={()=>this.clickSubmit()} className = 'Submit'>Submit</button>
			</div>
		);
	}
}
export default Todo;

import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

import './NewTodo.css';

class NewTodo extends Component{
	state = {
		title:'',
		content:'',
	}
	
	clickSubmit = () =>{
		alert('Submitted!')
	}

	render(){
		return(
			<div className = 'NewTodo'>
				<h1>New Todo</h1>
				
				<label>Title</label>
				<input 
				className = 'Title'
				value = {this.state.title}
				onChange ={(event) => this.setState({title:event.target.value})}>
				</input>
				
				<label>Content</label>
				<textarea
				className = 'Content'
				value = {this.state.content}
				onChange ={(event) => this.setState({content:event.target.value})}>
				</textarea>
				
				<NavLink to ='/main' onClick={()=>this.clickSubmit()} className = 'Submit'> Submit</NavLink>
			</div>	
		);
	}
}

export default NewTodo;

import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as action_types from '../store/actions/action_types';

import './NewTodo.css';

class NewTodo extends Component{
	state = {
		title:'',
		content:'',
	}
	
	clickSubmit = () =>{
		this.props.onStoreTodo(this.state.title, this.state.content);
		alert('Submitted!');
		this.props.history.push('/main');
		
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
				
				<button onClick={()=>this.clickSubmit()} className = 'Submit'> Submit</button>
			</div>	
		);
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		onStoreTodo: (title, content) =>
		dispatch({ type: action_types.ADD_TODO, title: title, content: content})
	};
};

export default connect(null,mapDispatchToProps)(NewTodo);

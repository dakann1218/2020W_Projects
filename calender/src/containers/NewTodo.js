import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as action_types from '../store/actions/action_types';

import './NewTodo.css';

class NewTodo extends Component{
	state = {
		title:'',
		content:'',
		date: this.props.match.params.date,
		submitted:false,
	}
	
	//Check if title is null or only spaces
	checkTitle = () =>{
		const title_split = this.state.title.split(' ');
		
		var only_space = true;
		for (var i in title_split){
			if(title_split[i] !=' '){
				only_space  = false;
			}
		}

		if (title_split[0] === ''){ return false;}
		else if (only_space){ return false;}
		else {return true;}
	}


	clickSubmit = () =>{
		if(this.checkTitle()){
			this.props.StoreTodo(this.state.date ,this.state.title, this.state.content);
			alert('Submitted!');
			this.setState({submitted:true});
		}
		else{
			alert('Please enter title');
		}
	}

	render(){
		if (this.state.submitted){
			return	<Redirect to='/main'/>
		}
		
		return(
			<div className = 'NewTodo'>
				<h1>New Todo</h1>
				
				<label>Title</label>
				<input 
				className = 'Title'
				placeholder = {'New Todo\'s Title!'}
				value = {this.state.title}
				onChange ={(event) => this.setState({title:event.target.value})}>
				</input>
				
				<label>Content</label>
				<textarea
				className = 'Content'
				placeholder = 'Write you content here...'
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
		StoreTodo: (date, title, content) =>
		dispatch({ type: action_types.ADD_TODO, date: date,title: title, content: content})
	};
};

export default connect(null,mapDispatchToProps)(NewTodo);

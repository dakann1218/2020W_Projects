import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import './Todo.css';

class Todo extends Component{
	state = {
		title:'',
		content:'',
		display: true,
		redirect: false,
	}
	
	componentDidMount() {
		axios.get(`/api/sendContent/${this.props.match.params.id}`) 
		.then(res => { this.setState({title: res.data.title, content: res.data.content});})
		.catch(err => alert('Todo Page Error'));
	}

	onClickModify = () =>{
		this.setState({display: false});	
	}

	onClickSubmit = (mode) =>{
		axios.post(`/api/modifyContent/${this.props.match.params.id}`,
			{'title':this.state.title,'content':this.state.content})
		.then(res => this.setState({display:true}))
		.catch(err => alert('Submit Error'));
		alert('Submitted Successfully!');
	}
	
	onClickDelete = () =>{
		axios.delete(`/api/deleteContent/${this.props.match.params.id}`)
		.then(res => this.setState({redirect: true}))
		.catch(err => alert('Delete Error'));
	}

	onClickReturn = (mode) =>{
		if(mode === 'display'){
			this.setState({redirect: true});
		}
		else{
			this.setState({display: true});
		}
	}

	render() {
		if (this.state.redirect){
			return <Redirect to = '/main'/>;
		}

		if (this.state.display){

			return(
				<div className = 'Todo'>
				<h1>Todo</h1>
				
				<label>Title</label>
				<div className = 'Title'>
				{this.state.title}
				</div>
				
				<label>Content</label>
				<div className = 'Content'>
				{this.state.content}
				</div>
				
				<div className = 'Buttons'>
				<button onClick={()=>this.onClickReturn('display')} className = 'Submit'>Return</button>
				<button onClick={()=>this.onClickDelete()} className = 'Submit'>Delete</button>
				<button onClick={()=>this.onClickModify()} className = 'Submit'>Modify</button>
				</div>
				
				</div>
			);
		}
		else{
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
				onChange = {(event) => this.setState({content:event.target.value})}>
				</textarea>

				<div className = 'Buttons'>
				<button onClick={()=>this.onClickReturn('modify')} className = 'Submit'>Return</button>
				<button onClick={()=>this.onClickSubmit('modify')} className = 'Submit'>Submit</button>
				</div>

				</div>
			);
		}
	}
}
export default Todo;

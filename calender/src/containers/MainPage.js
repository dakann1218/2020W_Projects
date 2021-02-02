import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import * as actionTypes from '../store/actions/action_types';


import './MainPage.css';

import DateBox from '../components/DateBox';




class MainPage extends Component{
	
	state = {
		start_day: this.props.storedStates['start_day'], //Number(this.props.match.params.start),
		month:  this.props.storedStates['month'], //Number(this.props.match.params.month),
		year:  this.props.storedStates['year'], //Number(this.props.match.params.year),
		days_in_month:[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		todo_titles:{},
		need_update: true,
	}

	componentDidMount(){
		if (this.state.need_update){
			this.setState({need_update: false});
			axios.post('/api/sendTodos/',{ 'year': this.state.year, 'month': this.state.month })
				.then(res => {
					this.setState({todo_titles: res.data.titles})})
				.catch(err => alert('Main Page Error'));
		}
	}
	
	//Add todolist with first update
	componentDidUpdate(){
		if (this.state.need_update){
			this.setState({need_update: false});
			this.getTodoTitles();
		}
		const tmp_days = this.state.days_in_month;
		if ((this.state.year)%4 === 0){
			if(this.state.days_in_month[1] === 28){
				this.setState({days_in_month: [...tmp_days.slice(0,1), 29,...tmp_days.slice(2,12)]});
			}
		}
		else{
			if(this.state.days_in_month[1] === 29){
				this.setState({days_in_month: [...tmp_days.slice(0,1), 28,...tmp_days.slice(2,12)]});
			}
		}
		this.props.onSaveState(this.state.year, this.state.month, this.state.start_day);
	}

	async getTodoTitles(){
		await axios.post('/api/sendTodos/',{ 'year': this.state.year, 'month': this.state.month })
				.then(res => {
					this.setState({todo_titles: res.data.titles})})
				.catch(err => alert('Main Page Error'));
	}
	
	//Make a row of week
	weekmaker = (day,num,week_key) =>{
		/* day : mon(0),tue(1),wed(2) ... -> hallow box on front: 0,1,2 ...
		   start date
		   dict: get title */
		var week = [];
		var date = num;
		var count = 0;
		var element_num = 0;
		const todo_dict = this.state.todo_titles //{date: [[id,title],[id,title],.....], date:[....],....}

		while(count < day){
			count = count + 1;
			element_num++;
			week.push(
				<DateBox key = {element_num} date={0}/>
			);
		}
		while (count < 7){
			element_num++;
			//give number of dates in the month by prop to MainPage
			if(date in todo_dict){
				let todo_list = []
				
				for (var key in todo_dict){
					if (Number(key) === date){
						for (var index in todo_dict[key]){
							todo_list.push(todo_dict[key][index]);
						}
					}
				}
				week.push(
					<DateBox key = {element_num} todo = {todo_list} year = {this.state.year} month = {this.state.month} date = {date}/>
				);
			}
			else{
				if (date > this.state.days_in_month[this.state.month - 1]){
					week.push(
						<DateBox key = {element_num} date={0}/>
					);
				}
				else{
					week.push(
						<DateBox key = {element_num} year = {this.state.year} month = {this.state.month} date = {date}/>
					);
				}
			}
			date = date + 1;
			count = count +1;
		}
		return(
			<div className = 'row' key = {week_key}>
			{week}
			</div>
		);
	}
	
	//When left/right button is clicked
	onChangeMonthHandler = (direction) => {
		
		const month = this.state.month;
		const year = this.state.year;
		if (direction === 'left'){
			this.setState({start_day: this.calculatePastStart()});
			
			if (month === 1){
				this.setState({ month: 12, year: year - 1});
			}
			else {
				this.setState({ month: month-1});
			}
		}
		else{
			this.setState({start_day: this.calculateNextStart()});
 			if (month === 12){
				this.setState({ month: 1, year: year + 1});
			}
			else {
				this.setState({ month: month + 1});
			}
		}
		this.setState({todo_titles: {}});
		this.setState({need_update: true});
	}

	//Calcuate where the 1st day starts	
	calculatePastStart = () =>{
		var tmp_start = this.state.start_day;
		var tmp_days = this.state.days_in_month[(this.state.month+10)%12];
		return (7 + tmp_start - tmp_days % 7)%7
	}

	calculateNextStart = () =>{
		var tmp_start = this.state.start_day;
		var tmp_days = this.state.days_in_month[this.state.month-1];
		return (tmp_start + (tmp_days % 7))% 7;
	}

	//Render
	render(){
		var weekday = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day,index) =>{
			return (<div className = 'day' key = { index }>
				{day}
				</div>
			);
		});

		weekday = (
				<div className = 'row'>
				{weekday}
				</div>
		);
		
		const weeks = 1 + Math.ceil((this.state.days_in_month[this.state.month - 1] - 7 + this.state.start_day)/7);	
		var calender = [...Array(weeks).keys()].map((i, index)=> {
			if(i === 0){
				return this.weekmaker(this.state.start_day,1,index);
			}
			else{
				return this.weekmaker(0,1 - this.state.start_day + i*7,index);
			}
		});
		
		calender = (
			<div className = 'Calender'>
			{weekday}
			{calender}
			</div>
		);

		return(
			<div className = 'MainPage'>
				<div className = 'Layout1'>	
					<h1 className = 'Title'>My calender</h1>	
					<div className = 'Layout1-1'>	
					<button className = 'Arrow left' onClick = {() => this.onChangeMonthHandler('left')}>{'< Left'}</button>
					<div className = 'MYbox'>
							<div className = 'Year'>{this.state.year}</div>
							<div className = 'Month'>{this.state.month}</div>
					</div>
					<button className = 'Arrow right' onClick = {() => this.onChangeMonthHandler('right')}>{'Right >'}</button>
					</div>
				</div>
				<div className = 'Layout2'>
						{calender}
				</div>
			</div>
		);
	}


};

const mapStateToProps = state =>{
	return{
		storedTodos: state.td.todos,
		storedStates: state.td.states,
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		onGetTodos: (year, month) => dispatch({type: actionTypes.GET_TODOS, year: year, month: month}),
		onSaveState: (year, month, start_day) => dispatch(
			{type: actionTypes.SAVE_STATE, year: year, month: month, start_day: start_day}
		),
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(MainPage);

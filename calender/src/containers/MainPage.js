import React,{Component} from 'react';
import {connect} from 'react-redux';

import './MainPage.css';

import DateBox from '../components/DateBox';




class MainPage extends Component{
	state = {
		start_day: 1,
		month: 12,
		year: 2020,
		days_in_month:['31','28','31','30','31','30','31','31','30','31','30','31']
	}

	weekmaker = (day,num) =>{
		/* day : mon(0),tue(1),wed(2) ... -> hallow box on front: 0,1,2 ...
		   start date
		   dict: get title */
		var week = [];
		const dict = this.props.storedTodos;
		var date = num;
		var count = 0;
		while(count < day){
			count = count + 1;
			week.push(
				<DateBox date={0}/>
			);
		}
		while (count < 7){ 
			//give num of dates in the month by prop to MainPage
			if(date in dict){
				const titles = dict[date].map((tuple)=>{return tuple[0];})
				week.push(
					<DateBox todo= {titles} date = {date}/>
				);
			}
			else{
				if (date > this.state.days_in_month[this.state.month - 1]){
					week.push(
						<DateBox date={0}/>
					);
				}
				else{
					week.push(
						<DateBox date = {date}/>
					);
				}
			}
			date = date + 1;
			count = count +1;
		}
		return(
			<div className = 'row'>
			{week}
			</div>
		);
	}

	onChangeMonthHandler = (direction) => {
		const month = this.state.month
		const year = this.state.year
		if (direction === 'left'){
			
			if (month === 1){
				this.setState({	month: 12, year: year - 1});
			}
			else {
				this.setState({month: month - 1});
			}

			this.setState({ start_day: this.calculatePastStart()})
		}
		else{
			
			if (month === 12){
				this.setState({month: 1, year: year + 1});
			}
			else {
				this.setState({month: month + 1});
			}

			this.setState({ start_day: this.calculateNextStart()})
		}
	}
	
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

	render(){
		const tmp_days = this.state.days_in_month;
		if ((this.state.year)%4 === 0){
			if(this.state.days_in_month[1]==='28'){
				this.setState({days_in_month: [...tmp_days.slice(0,1),'29',...tmp_days.slice(2,12)]});
			}
		}
		else{
			if(this.state.days_in_month[1]==='29'){
				this.setState({days_in_month: [...tmp_days.slice(0,1),'28',...tmp_days.slice(2,12)]});
			}
		}

		var weekday = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day)=>{
			return (<div className = 'day'>
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
		var calender = [...Array(weeks).keys()].map((i)=> {
			if(i === 0){
				return this.weekmaker(this.state.start_day,1);
			}
			else{
				return this.weekmaker(0,1 - this.state.start_day + i*7);
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
					<h1 className = 'Title'>{this.props.title}</h1>	
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
	}
}

export default connect(mapStateToProps,null)(MainPage);

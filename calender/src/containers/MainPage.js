import React,{Component} from 'react';
import {connect} from 'react-redux';

import './MainPage.css';

import DateBox from '../components/DateBox';




class MainPage extends Component{
	state = {
		start_day: 1,
		total_days:31,
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
				if (date > this.state.total_days){
					week.push(
						<DateBox date={0}/>
					);
				}
				else{
					week.push(
						<DateBox date = {date} />
					);
				}
			}
			date = date + 1;
			count = count +1;
		}
		return(
			<div className = 'row divider'>
			{week}
			</div>
		);
	}
	calender = (day,num) =>{


	}





	render(){
		var calender = [0,1,2,3,4].map((i)=> {
			if(i === 0){
				return this.weekmaker(this.state.start_day,1);
			}
			else{
				return this.weekmaker(0,1 - this.state.start_day + i*7);
			}
		});
			
		return(
			<div className = 'MainPage'>
				<div className = 'Layout1'>
					<h1 className = 'Title'>{this.props.title}</h1>
				</div>
				<div className = 'Layout2'>
					<div className= 'Calender'>
						{calender}
					</div>
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

import React,{Component} from 'react';

import './MainPage.css';

import DateBox from '../components/DateBox';




class MainPage extends Component{


	render(){
		const Calender = [...Array(30).keys()].map(num => {
			return(
				<DateBox
					todo = 'Todo'
					date = {num + 1}
				/>
			);
		});

		return(
			<div className = 'MainPage'>
				<div className = 'Layout1'>
					<h1 className = 'Title'>{this.props.title}</h1>
				</div>
				<div className = 'Layout2'>
					<div className= 'Calender'>
						{Calender}
					</div>
				</div>
			</div>
		);
	}
}

export default MainPage

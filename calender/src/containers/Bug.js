import React,{Component} from 'react';

import	'./MainPage.css';

class Bug extends Component{
	
	render(){
		const day = ['월','화','수','목','금','토','일']
		const starting_day = 2

		let alldates = []

		for (var i in day){
			const k = i
			var date_block = [0,1,2,3,4].map((x) => {
				alert([k, starting_day, x])
				var num = (k + 1 - starting_day) + (7*x)
				alert(num)
				return( 
					<div className = 'date'>{num}</div>
				)
			})
			alldates.push(date_block)
		}	

		var week = []
		for (var j in day){
			week.push(
				<div className='item'>
					<div className = 'dow'>
						{day[j]}
					</div>
					{alldates[j]}
				</div>
			)
		}


		return(
			<header>
				<div className = 'Test'>
					{week}
				</div>
			</header>
		);
	}


};

export default MainPage;


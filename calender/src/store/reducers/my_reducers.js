import * as action_types from '../actions/action_types';
import axios from 'axios';

const initialState = {
	states: {'year':2020, 'month':12, 'start_day':1},
	todos: {}
};

const reducer = (state = initialState, action) =>{
	
	switch(action.type){
		
		case action_types.ADD_TODO:
			if (action.date in state.todos){//있으면 data concat
				state.todos[action.date].push([action.title, action.content]);
				return state;
			}
			else{ //없으면 data insert
				state.todos[action.date] = [[action.title, action.content]];
				return state;
			}
		
		case action_types.GET_TODOS:
			return;
		
		case action_types.SAVE_STATE:
			state.states['year'] = action.year;
			state.states['month'] = action.month;
			state.states['start_day'] = action.start_day;
			return state; 
		default:
			break;
	}
	return state;
};

export default reducer;

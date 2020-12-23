import * as action_types from '../actions/action_types';

const initialState = {
	todos:{}
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
		default:
			break;
	}
	return state;
};

export default reducer;

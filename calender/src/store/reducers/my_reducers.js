import * as action_types from '../actions/action_types';

const initialState = {
	todos:{}
};

const reducer = (state = initialState, action) =>{
	switch(action.type){
		case action_types.ADD_TODO:
			if (action.date in state.todos){//있으면 data concat
				return {...state, todos: state.todos[action.date].concat([action.title, action.content])}
			}
			else{ //없으면 data insert
				return {...state, todos: state.todos[action.date] = [[action.title, action.content]]}
			}
		default:
			break;
	}
	return state;
};

export default reducer;

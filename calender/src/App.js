import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter} from 'connected-react-router';

import MainPage from './containers/MainPage'
import NewTodo from './containers/NewTodo'
import Todo from './containers/Todo'

function App(props) {
  return (
	  <BrowserRouter>
	  <div className="App">
    		<Switch>
	  	<Route path = '/main' exact component = {MainPage} />
	  	<Route path = '/newtodo/:year/:month/:date' exact component = {NewTodo} />
	  	<Route path = '/todo/:id' exact component = {Todo} />
	  	<Redirect exact from = '/' to = '/main' />
	  	<Route render = {()=> <h1>Not Found</h1>} />
	  	</Switch>
	  </div>
	  </BrowserRouter>
  );
}

export default App;

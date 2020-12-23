import {BrowserRouter,Route, Switch,Redirect} from 'react-router-dom';


import MainPage from './containers/MainPage'
import NewTodo from './containers/NewTodo'
import Todo from './containers/Todo'

function App() {
  return (
	  <BrowserRouter>
	  <div className="App">
    		<Switch>
	  	<Route path = '/main' exact render = {() => <MainPage title = 'My calender'/>} />
	  	<Route path = '/newtodo/:date' exact component = {NewTodo} />
	  	<Route path = '/todo' exact render = {() => <Todo/>} />
	  	<Redirect exact from = '/' to = '/main' />
	  	<Route render = {()=> <h1>Not Found</h1>} />
	  	</Switch>
	  </div>
	  </BrowserRouter>
  );
}

export default App;

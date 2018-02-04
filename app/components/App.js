//var React = require('react');
import React from 'react';
import Popular from './Popular'
import {Route, Switch} from 'react-router-dom';
import {BrowserRouter} as Router from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';

class App extends React.Component {

	render(){
		return (
			<Router>
				<div className='container'> 
					<Nav/>
					<Switch>
						
						<Route exact path="/" component={Home} />
						<Route exact path="/battle" component={Battle} />	
						<Route exact path="/popular" component={Popular} />
						<Route  path="/battle/results" component={Results} />		
						<Route render={function(){
							return <p>Not Found</p>
						}} />
					</Switch>
				</div>
			</Router>
		)
	}

};

export default App;
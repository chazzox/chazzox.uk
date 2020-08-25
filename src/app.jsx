import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './views/home';
import Privacy from './views/privacy';
import NoMatchPage from './views/404.jsx';
import CV from './views/cv';

class App extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/CV" render={() => <CV />} />
				<Route exact path="/privacy" render={() => <Privacy />} />
				<Route exact path="/" render={() => <Home />} />
				<Route component={NoMatchPage} />
			</Switch>
		);
	}
}

export default App;

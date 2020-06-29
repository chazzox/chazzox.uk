import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './components/home';
import Pattern from './components/pattern';
import Privacy from './components/privacy';
import Cipher from './components/cipher';
import NoMatchPage from './components/404.jsx';
import Battleships from './components/battleships';
import CV from './components/cv';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Route exact path="/CV" render={() => <CV />} />
				<Route exact path="/privacy" render={() => <Privacy />} />
				<Route exact path="/pattern" render={() => <Pattern />} />
				<Route exact path="/cipher" component={Cipher} />
				<Route path="/battleships" render={() => <Battleships />} />
				<Route exact path="/" render={() => <Home />} />
				<Route component={NoMatchPage} />
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

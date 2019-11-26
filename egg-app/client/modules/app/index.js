import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import history from './history';
import Mobile from './pages/index';
import configureStore from './configureStore';
import '../../vendors/lib-flexible/flexible.debug.js';
import '../../vendors/lib-flexible/flexible_css.debug.js';
import './styles/main.less'

if(process.env.NODE_ENV === 'development') {
//   require('@/common/helpers/vconsole.js');
}

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

function render(Component){
	ReactDOM.render(
	  	<Provider store={store}>
	      <ConnectedRouter history={history}>
	        <Component />
	      </ConnectedRouter>
	    </Provider>,
	  MOUNT_NODE
	);
}


render(Mobile);

// hot load
if (module.hot) {
	module.hot.accept();
  // module.hot.accept('./pages/index', () => { 
  // 	render(Mobile);
  // })
}
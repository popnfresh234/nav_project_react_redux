import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import rootReducer from './redux/reducers/rootReducer';
import App from './App.jsx';
import './css/ant-theme-vars.less';

const store = createStore(
  rootReducer,
);

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </React.Fragment>
  </Provider>,
  document.getElementById( 'react-root' ),
);

export default store;

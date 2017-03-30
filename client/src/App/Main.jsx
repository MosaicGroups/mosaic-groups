import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header.jsx';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router history={Router.hashHistory}>
    <div className="container">
      <Header />
      <Route path="/" rendor={() => {
          return (
            <div>hi</div>
          );
      }} />
      {/*
      <Route path="/login" component="" />
      <Route path="/profile" component="" />
      <Route path="/group-create-or-edit" component="" />
      <Route path="/group-create-or-edit/:id" component="" />
      <Route path="/user-edit/:id" component="" />
      <Route path="/user-list" component="" />
      <Route path="/user-create" component="" />
      <Route path="/group-list" component="" />
      <Route path="/group-join/:id" component="" />
      <Route path="/group-full/:id" component="" />*/}
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

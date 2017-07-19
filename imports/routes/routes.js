import { Meteor}  from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

const unauthenticatedPages = ['/', '/signup'];
const authententicatedPages = ['/Dashboard'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/Dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authententicatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/Dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

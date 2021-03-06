import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Footer from './components/footernew/footer';
import MainFormBlock from './components/startPage/startPage';
import ErrorPageBlock from './components/errorPage/ErrorPage';
import ConferencePageBlock from './components/conferencePage/conference';

import {
  AppWrapper
} from './styles';

function App() {
  let message = useSelector(state => state.error.errorMessage);
  
  return (
    <>
    <AppWrapper>
      <Redirect push to="/home" />
      
      <Switch>
        <Route path='/home' component={MainFormBlock} />
        <Route path='/conf' component={ConferencePageBlock} />
        <Route path='/' component={_ => <ErrorPageBlock message={message} />} />
      </Switch>
      <Footer />
    </AppWrapper>
    </>
  );
}

export default App;

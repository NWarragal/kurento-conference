import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Example from './Example';
import Footer from './components/footernew/footer';
import Loader from './components/loader/loader';
import MainFormBlock from './components/startPage/startPage';
import ErrorPageBlock from './components/errorPage/ErrorPage';
import ConferencePageBlock from './components/conferencePage/conference';

import {
  AppWrapper
} from './styles';

function App() {
  
  return (
    <>
    <Example />
    {/* <AppWrapper>
      <Redirect push to="/home" />
      
      <Switch>
        <Route path='/home' component={MainFormBlock} />
        <Route path='/conf' component={ConferencePageBlock} />
        <Route path='/' component={_ => <ErrorPageBlock message={'something is wrong, reload please'} />} />
      </Switch>
      <Footer />
    </AppWrapper> */}
    </>
  );
}

export default App;

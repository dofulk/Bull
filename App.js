import React from 'react';
import store from './main/redux/index';
import { Provider } from 'react-redux';
import AppContainerScreen from './main/screens/appcontainerscreen';





export default class App extends React.Component {




  render() {
    return (
      <Provider store={store}>
        <AppContainerScreen />
      </Provider>
    )
  }
}


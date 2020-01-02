import React from 'react';
import store from './main/redux/index';
import { Provider } from 'react-redux';
import AppContainerScreen from './main/screens/appcontainerscreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { PaperTheme } from './main/styles/index';




export default class App extends React.Component {




  render() {
    return (
      <PaperProvider theme={PaperTheme}>
        <Provider store={store}>
          <AppContainerScreen />
        </Provider>
      </PaperProvider>
    )
  }
}


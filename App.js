import React from 'react';
import store from './main/redux/index';
import { Provider } from 'react-redux';
import AppContainerScreen from './main/screens/appcontainerscreen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    placeholder: 'rgba(255,255,255, .60)', text: 'rgba(255,255,255, .87)',
    underlineColor: 'transparent', background: 'rgba(255,255,255, .11)', primary: "#ef4f6a", secondary: "#d6bd4c", accent: "#7600dd"
  },
  roundness: 5
}



export default class App extends React.Component {




  render() {
    return (
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <AppContainerScreen />
        </Provider>
      </PaperProvider>
    )
  }
}


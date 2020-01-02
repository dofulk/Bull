import {DefaultTheme} from 'react-native-paper';
 
const PaperTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    placeholder: 'rgba(255,255,255, .60)', text: 'rgba(255,255,255, .87)',
    underlineColor: 'transparent', background: 'rgba(255,255,255, .11)', primary: "#ff5973", accent: "#7c40bd"
  },
  roundness: 5
}

export default PaperTheme;
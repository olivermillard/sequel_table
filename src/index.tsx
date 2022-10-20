import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { NativeBaseProvider, extendTheme } from 'native-base';
import './main.css';

const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
    },
});

// extend the theme
type MyThemeType = typeof theme;
declare module 'native-base' {
  type ICustomTheme = MyThemeType
}
ReactDOM.render(
    <React.StrictMode>
        <NativeBaseProvider theme={theme}>
            <App />
        </NativeBaseProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

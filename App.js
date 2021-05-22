/**
 * Merging Point
 * https://github.com/merging-point/merging-point-app
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { WebView } from 'react-native-webview';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <WebView source={{ uri: 'http://merging-point.s3-website.ap-northeast-2.amazonaws.com/' }} />
    </SafeAreaView>
  );
};

export default App;

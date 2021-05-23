/**
 * Merging Point
 * https://github.com/merging-point/merging-point-app
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from 'react-native-background-timer';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const WebViewRef = useRef();
  const [myLocation, setMyLocation] = useState({lat: 0, lng: 0});
  const [gpsError, setGpsError] = useState<boolean>(false);

  const postMessage = (type, data) =>
    WebViewRef.current?.postMessage(
      JSON.stringify({
        type,
        data,
      }),
    );

  const handleMessage = data => {
    const message = JSON.parse(data.nativeEvent.data);
    switch (message.type) {
      case 'page':
        // props.navigation.navigate(message.page, {id: message.data});
        break;
      case 'geolocation':
        handleGeolocation();
        break;
      case 'background-start':
        handleGeolocationBackground();
    }
  };

  const handleGeolocation = () => {
    Geolocation.getCurrentPosition(
      info =>
        setMyLocation({lat: info.coords.latitude, lng: info.coords.longitude}),
      () => {
        setGpsError(true);
      },
    );
  };

  const handleGeolocationBackground = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      Geolocation.getCurrentPosition(
        info => {
          const {latitude, longitude} = info.coords;
          console.log(latitude, longitude);
        },
        () => {
          console.log('error');
        },
      );
    }, 3000);
  };

  useEffect(() => {
    postMessage('geolocation', myLocation);
  }, [myLocation]);

  useEffect(() => {
    postMessage('gpsError', {error: gpsError});
  }, [gpsError]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <WebView
        ref={WebViewRef}
        style={{flex: 1}}
        javaScriptEnabled={true}
        bounces={false}
        source={{
          uri: 'http://merging-point.s3-website.ap-northeast-2.amazonaws.com/',
        }}
        onMessage={handleMessage}
        onLoadEnd={() => setInterval(handleGeolocation, 300)}
        onError={() =>
          Alert.alert('오류가 발생했습니다.', '다시 시도하시겠습니까?', [
            {
              text: '다시 시도하기',
              onPress: () => WebViewRef.current?.reload(),
            },
          ])
        }
      />
    </SafeAreaView>
  );
};

export default App;

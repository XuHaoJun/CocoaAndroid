# CocoaAndroid [![Build Status](https://travis-ci.org/XuHaoJun/CocoaAndroid.svg?branch=master)](https://travis-ci.org/XuHaoJun/CocoaAndroid)

## Install
```
npm install
npm run link
```

## Run
```
npm run android
// or
npm install -g react-native-cli
react-native run-android
```

## Requirment
- Android SDK Build-tools version 23.0.1
- Android 6.0 (API 23)
- Android Support Repository

## Troubleshooting
- Error while uploading apk, try `adb reverse tcp:8081 tcp:8081`

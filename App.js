import 'react-native-gesture-handler'
import * as React from 'react'
import { NativeBaseProvider } from 'native-base'

import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_100Thin, Poppins_100Thin_Italic } from '@expo-google-fonts/poppins'

import Container from './Container'

export default function App() {

  // const theme = extendTheme()
  return (
    <NativeBaseProvider>
      <Container />
    </NativeBaseProvider>
  )
}


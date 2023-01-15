import 'react-native-gesture-handler';

import { GalioProvider } from 'galio-framework';
import React from 'react';
import RootComponent from './src/components/RootComponent';
import { materialTheme } from './src/constants/';

export default function App() {
  return (
    <GalioProvider theme={materialTheme}>
      <RootComponent />
    </GalioProvider>
  );
}

import '../ActionSheet'

import React from 'react';
import { SheetProvider } from 'react-native-actions-sheet';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../../navigator/rootNavigator';

const RootComponent = () => {
  return (
    <NavigationContainer>
      <SheetProvider>
        <RootNavigator />
      </SheetProvider>
    </NavigationContainer>
  );
};

export default RootComponent;

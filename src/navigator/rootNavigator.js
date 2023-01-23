import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CurrentLocation from '../components/CurrentLocation';
import HomeScreen from '../components/Home';
import OnboardingScreen from '../components/Onboarding';
import SettingsScreen from '../components/Settings';
import { materialTheme } from '../constants';

const Stack = createStackNavigator();

const globalScreenOptions = {
  mode: 'card',
  headerShown: false,
  headerLeft: null,
};

const localStackOptions = {
  headerLargeTitleStyle: {},
  headerTitleStyle: { color: '#4C4C4C', fontSize: 16 },
  headerTintColor: '#2D2D2D',
  headerTitleAlign: 'center',
};

const RootStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={localStackOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTransparent: true,
          headerLeft: () => <CurrentLocation />,
          headerTitle: '',
          headerRight: ({ focused }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              family="GalioExtra"
              color={materialTheme.COLORS.MUTED}
              style={{ marginRight: 16, marginTop: 10 }}
              onPress={() => navigation.navigate('Settings')}
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const RootRouter = () => (
  <Stack.Navigator screenOptions={globalScreenOptions}>
    <Stack.Screen
      name="Onboarding"
      component={OnboardingScreen}
      option={{
        headerTransparent: true,
      }}
    />
    <Stack.Screen name="App" component={RootStack} />
  </Stack.Navigator>
);

export default RootRouter;

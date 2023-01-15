import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/Home';
import OnboardingScreen from '../components/Onboarding';
import SettingsScreen from '../components/Settings';
import { materialTheme } from '../constants';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

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
          title: 'Volume Manager',
          headerLeft: null,
          headerRight: ({ focused }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              family="GalioExtra"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
              style={{ marginLeft: 4, marginRight: 10 }}
              onPress={() => navigation.navigate('Settings')}
              size={16}
            />
          ),
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

// const TabStack = () => (
//   <Tab.Navigator
//     initialRouteName="Home"
//     tabBarOptions={{
//       activeTintColor: '#101010',
//     }}
//     barStyle={{
//       height: 60,
//     }}
//   >
//     <Tab.Screen
//       name="Home"
//       component={HomeStack}
//       options={{
//         tabBarLabel: 'Home',
//         tabBarIcon: ({ color, size }) => (
//           <MaterialCommunityIcons  color={color} name="home-outline" size={size} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Settings"
//       component={SettingsStack}
//       options={{
//         tabBarLabel: 'Settings',
//         tabBarIcon: ({ color, size }) => (
//           <MaterialCommunityIcons color={color} name="cog-outline" size={size} />
//         ),
//       }}
//     />
//   </Tab.Navigator>
// );

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

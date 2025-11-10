// App.js - Alternative with completely hidden headers
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';
import CertificateScreen from './src/screens/CertificateScreen';
import TemplateScreen from './src/screens/TemplateScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#7C3AED',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '800',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="Template" 
            component={TemplateScreen}
            options={{ 
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="Certificate" 
            component={CertificateScreen}
            options={{ 
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
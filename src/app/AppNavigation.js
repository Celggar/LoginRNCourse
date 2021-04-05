import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '../screens/Main';
import Login from '../screens/Login';
import PokemonDetail from '../screens/PokemonDetail';

const Stack = createStackNavigator();
const AppNavigation = () => {
  const {isLogged} = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        {isLogged ? (
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Detail" component={PokemonDetail} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {AppNavigation};

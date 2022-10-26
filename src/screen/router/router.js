import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Register from '../Register';
import Home from '../Home'
import Login from '../login';
import Splash from '../splash';
import Submit from '../submit';

const  AppRouter=()=>{

    return(
        <NavigationContainer>
        <Stack.Navigator initialRouteName='splash'
        screenOptions={{
          headerShown: false
        }}
        >

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="submit" component={Submit} />
       
     
        </Stack.Navigator>
      </NavigationContainer>
    )
}
export default AppRouter;
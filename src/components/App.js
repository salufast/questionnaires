/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client';

import QuestionnaireContainer from './QuestionnaireContainer';
import QuestionnaireLarkOwl from './QuestionnaireLarkOwl';
import QuestionnaireFastingProtocol from './QuestionnaireFastingProtocol';
import QuestionnaireWHO5 from './QuestionnaireWHO5';

import SaluTitle from '../saluComponents/SaluTitle';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    login();
  }, []);

  const login = useCallback(async () => {
    const response = await fetch('https://api.development.salufast.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": "questionnaire@salufast.com",
        "password": "O%^87p$NW}#vf8K0y?{{"
        }),
    });
    const tokenPair = await response.json();
    await AsyncStorage.setItem('accessToken', tokenPair.access_token);
    await AsyncStorage.setItem('refreshToken', tokenPair.refresh_token);
  }, []);

  return <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: 'Back',
          headerTintColor: '#008888',
          headerTitle: props => <SaluTitle {...props} />,
          headerStyle: {
            backgroundColor: '#fafafa',
            elevation: 0,
          },
        }}>
        <Stack.Screen
          name="questionnaires"
          component={QuestionnaireContainer}
          options={{ title: 'Questionnaires' }}
        />

        <Stack.Screen
          name="larkOwlQuestionnaire"
          component={QuestionnaireLarkOwl}
          options={{ title: 'Lark Owl Test' }}
        />

        <Stack.Screen
          name="fastingProtocolQuestionnaire"
          component={QuestionnaireFastingProtocol}
          options={{ title: 'Fasting Protocol' }}
        />

        <Stack.Screen
          name="who5Questionnaire"
          component={QuestionnaireWHO5}
          options={{ title: 'WHO-5 Well-Being Index' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </ApolloProvider>;
};

export default App;

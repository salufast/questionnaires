import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import apolloLogger from 'apollo-link-logger';

import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from './base64';
import moment from 'moment';

const httpLink = createHttpLink({
  uri: 'https://hasura.development.salufast.com/v1/graphql',
});

const decodeClaims = token => {
  const tokenParts = token.split('.');
  const claimsString = tokenParts[1] ? base64.atob(tokenParts[1]) : '{}';
  return JSON.parse(claimsString);
};

const authMiddleware = setContext(async (_, { headers }) => {
  try {
    var accessToken = await AsyncStorage.getItem('accessToken');
    const accessTokenClaims = decodeClaims(accessToken);
    const tokenExpired = !accessTokenClaims.exp || moment().add(10, 'seconds').isAfter(
      moment.unix(accessTokenClaims.exp)
    );
      
    if (tokenExpired) {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await fetch('https://api.development.salufast.com/refresh', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + refreshToken,
        },
      });
      const newTokenPair = await response.json();
      await AsyncStorage.setItem('accessToken', newTokenPair.access_token);
      await AsyncStorage.setItem('refreshToken', newTokenPair.refresh_token);
      accessToken = newTokenPair.access_token;
    };
    
    return {
      headers: {
        ...headers,
        ...(accessToken && { authorization: 'Bearer ' + accessToken }),
        'x-hasura-role': 'user',
      },
    };
  } catch (error) {
    console.log(error);
  };
});

const client = new ApolloClient({
  uri: 'https://hasura.development.salufast.com/v1/graphql',
  cache: new InMemoryCache(),
  link: from([apolloLogger, authMiddleware, httpLink]),
});

export default client;
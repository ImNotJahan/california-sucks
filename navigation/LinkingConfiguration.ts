/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Summary: {
            screens: {
              SummaryScreen: 'summary',
            },
          },
          Fire: {
            screens: {
              Fire: 'fire',
            },
          },
		  Dust: {
            screens: {
              Dust: 'dust',
            },
          },
		  Polution: {
            screens: {
              Fire: 'polution',
            },
          },
		  Light: {
            screens: {
              Fire: 'light',
            },
          },
		  Temperature: {
            screens: {
              Fire: 'temperature',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;

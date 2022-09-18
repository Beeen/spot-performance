import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// COMPONENTS
import FeedContainer from './feed/FeedContainer';
import SearchContainer from './search/SearchContainer';
import AccountContainer from './account/AccountContainer';

// ICONS
import Feed from '@assets/icons/feed.svg'
import Search from '@assets/icons/search.svg'
import Account from '@assets/icons/account.svg'

// COLORS
const green = "#B6D353"
const grey = "#999DA0"

const Tab = createBottomTabNavigator();

const Home = () => {

  return (
    <Tab.Navigator

      initialRouteName={'Home'}

      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'lightgray',
        activeBackgroundColor: 'black',
        inactiveBackgroundColor: 'black',
        style: {
          backgroundColor: 'black',
          paddingBottom: 3
        }
      }}

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconColor;

          if (route.name === 'Feed') {
            iconColor = focused
              ? green
              : grey;
            return (
              <Feed fill={iconColor} ></Feed>
            );
          } else if (route.name === 'Rechercher') {
            iconColor = focused
              ? green
              : grey;
            return (
              <Search fill={iconColor}></Search>
            );
          } else if (route.name === 'Compte') {
            iconColor = focused
              ? green
              : grey;
            return (
              <Account fill={iconColor}></Account>
            );
          } else {
            return null
          }
        },
      })}
    >
      {/* //Add options={{ tabBarBadge: 3 }} for badges  */}
      <Tab.Screen name="Feed" component={FeedContainer} />
      <Tab.Screen name="Rechercher" component={SearchContainer} />
      <Tab.Screen name="Compte" component={AccountContainer} />
    </Tab.Navigator>
  );
}

export default Home;

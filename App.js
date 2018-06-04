
'use strict';
import {
  StackNavigator,
} from 'react-navigation';

import SearchPage from './src/components/SearchPage';
import SearchResults from './src/components/SearchResults';
import PropertyView from './src/components/PropertyView';

const App = StackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
  Property: { screen: PropertyView},
});
export default App;

import { AppRegistry } from 'react-native';
import App from './App'; // Ensure this path is correct
import { name as appName } from './app.json'; // Ensure app.json exists

AppRegistry.registerComponent(appName, () => App);

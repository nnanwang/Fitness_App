// Importing necessary components and functions from 'react-navigation' library
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing screen components from their respective files
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import FitScreen from '../screens/FitScreen';
import RestScreen from '../screens/RestScreen';
import AICoach from '../screens/AICoach';

const StackNavigator = () => {
  // Creating a stack navigator instance
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />

        <Stack.Screen options={{headerShown: false}} name="Workout" component={WorkoutScreen} />

        <Stack.Screen options={{ headerShown: false }} name="Fit" component={FitScreen} />

        <Stack.Screen options={{ headerShown: false }} name="Rest" component={RestScreen} />

        <Stack.Screen options={{ headerShown: false }} name="AICoach" component={AICoach} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// Exporting StackNavigator for use in the app
export default StackNavigator
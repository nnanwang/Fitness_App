import { FitnessContext } from './Context';
import StackNavigator from './components/StackNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <FitnessContext>
        <StackNavigator />
      </FitnessContext>
      </>
  );
}



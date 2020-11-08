import { Provider } from 'react-redux';
import MainStore from './reducer';
import Home from './home/components/home';

const App = () => (
  <Provider store={MainStore}>
      <Home />
  </Provider>
)

export default App;

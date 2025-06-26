// App.tsx
import RoutesApp from './routes/routes';
import axios from "axios";
1

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  
  return <RoutesApp />;
}

export default App;

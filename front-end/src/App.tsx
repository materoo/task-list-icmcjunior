import RoutesApp from './routes/routes';
import { BrowserRouter} from 'react-router-dom';
import axios from "axios";
import { UserProvider } from './contexts/UserContext';


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  
  axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
}, error => {
  console.error('Request Error', error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.error('Response Error', error.response);
  return Promise.reject(error);
});
  return(
    <BrowserRouter>
      <UserProvider>
        <RoutesApp />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

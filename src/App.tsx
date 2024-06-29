import Navbar from './components/navbar/Navbar';
import Content from './components/content/Content';
import Flexbox from './containers/flexbox/Flexbox';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Flexbox>
        <Content />
      </Flexbox>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;

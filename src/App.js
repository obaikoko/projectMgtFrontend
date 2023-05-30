import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});
const project = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client} project={project}>
        <Router>
          <ToastContainer />
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/project/:id' element={<Project />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;

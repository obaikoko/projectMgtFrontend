import Clients from '../components/Clients';
import AddClientForm from '../components/AddClientForm';
import Project from '../components/Project';
import AddProjectForm from '../components/AddProjectForm';
const Homepage = () => {
  return (
    <div>
      <div className='d-flex gap-3 mb-4'>
        <AddClientForm />
        <AddProjectForm/>
      </div>
      <Project />
      <br />
      <Clients />
    </div>
  );
};

export default Homepage;

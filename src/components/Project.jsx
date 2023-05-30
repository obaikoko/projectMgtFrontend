import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import ProjectCard from './ProjectCard';
import Spinner from './Spinner';

const Project = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) {
    return <Spinner/>
  }
  if (error) {
    return <p>Something went wrong</p>
  }
  return (
    <div>
      <h1>Projects</h1>
      {data.Projects.length > 0 ? (
        <div className='row mt-5'>
          {data.Projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <>No Projects</>
      )}
    </div>
  );
};

export default Project;

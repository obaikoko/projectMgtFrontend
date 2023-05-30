import { GET_PROJECT } from '../queries/projectQueries';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectBtn from '../components/DeleteProjectBtn';

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <>Something went wrong</>;
  }
  return (
    <div>
      {!loading && !error && (
        <>
          <div className='mx-auto w-75 card p-5'>
            <Link to='/' className='btn btn-light btn-sm w-25 ms-auto d-inline'>
              Back
            </Link>
            <h1>{data.Project.name}</h1>
            <p>{data.Project.description}</p>
            <h5 className='mt-3'>Project Status</h5>
            <p className='lead'>{data.Project.status}</p>
            {data && data.Project.client ? (
              <ClientInfo client={data.Project.client} project={data.Project} />
            ) : (
              <div>
                <p className='lead'>No Client Info</p>
                <DeleteProjectBtn project={data.project} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Project;

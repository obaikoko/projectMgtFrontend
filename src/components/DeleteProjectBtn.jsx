import { useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { DELETE_PROJECT } from '../mutations/projectMutation';
import { GET_PROJECTS } from '../queries/projectQueries';
import{ toast} from'react-toastify'

const DeleteProjectBtn = ({project}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDeleteProject = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this project'
    );
    if (confirmed) {
      deleteProject();
      toast.warn(`${project.name} Project deleted successfully`)
      
    }
  };
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  return (
    <div>
      <button
        className='btn btn-light btn-sm mt-4 text-danger'
        onClick={handleDeleteProject}
      >
        Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectBtn;

import { UPDATE_PROJECT } from '../mutations/projectMutation';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECT, GET_PROJECTS } from '../queries/projectQueries';
import { toast } from 'react-toastify';

import { useState } from 'react';

const UpdateProjectBtn = ({ project }) => {

  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    status: '',
  });
  const { name, description, status } = formData;
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: {id: project.id},
      refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],

  });

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status) {
      return alert('Please add all field');
    }
    updateProject(name, description, status);
    toast.success(`${name} updated successfully`);
  };
  if (loading) {
    return null;
  }
  if (error) {
    return 'Something went wrong';
  }
  return (
    <>
      <>
        <button
          type='button'
          className='btn btn-light btn-sm mt-4'
          data-bs-toggle='modal'
          data-bs-target='#addProjectModal'
        >
          <div className='d-flex align-items-center'>
            <div> Update Project</div>
          </div>
        </button>

        <div
          className='modal fade'
          id='addProjectModal'
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                  Add Project
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <form onSubmit={onSubmit}>
                  <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>
                      Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      value={name}
                      onChange={handleInputChange}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='description' className='form-label'>
                      Description
                    </label>
                    <textarea
                      type='text'
                      name='description'
                      id='description'
                      value={description}
                      onChange={handleInputChange}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='status' className='form-label'>
                      Status
                    </label>
                    <select
                      name='status'
                      id='status'
                      className='form-select'
                      onChange={handleInputChange}
                    >
                      <option value='new'>Not started</option>
                      <option value='progress'>In progress</option>
                      <option value='completed'>Completed</option>
                    </select>
                  </div>

                  <button
                    className='btn btn-secondary'
                    type='submit'
                    data-bs-dismiss='modal'
                  >
                    submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default UpdateProjectBtn;

import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutation';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import { toast } from 'react-toastify';

import { useState } from 'react';

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    status: 'new',
    clientId: '',
  });
  const { name, description, url, status, clientId } = formData;
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, url, status, clientId },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

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
    addProject(name, description, status, clientId);
    toast.success(`${name} created successfully`);

    setFormData({ name: '', description: '', url: '', status: 'New', clientId: '' });
  };
  if (loading) {
    return null;
  }
  if (error) {
    return 'Something went wrong';
  }
  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addProjectModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon mx-2' />
              <div> Add Project</div>
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
                      <label htmlFor='url' className='form-label'>
                        Url
                      </label>
                      <input
                        type='text'
                        name='url'
                        id='url'
                        value={url}
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
                    <div className='mb-3'>
                      <label htmlFor='client' className='form-label'>
                        Client
                      </label>
                      <select
                        name='clientId'
                        id='clientId'
                        className='form-select'
                        value={clientId}
                        onChange={handleInputChange}
                      >
                        <option>Select Client</option>
                        {data.Clients.map((client) => (
                          <option value={client.id} key={client.id}>
                            {client.name}
                          </option>
                        ))}
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
      )}
    </>
  );
};

export default AddProjectForm;

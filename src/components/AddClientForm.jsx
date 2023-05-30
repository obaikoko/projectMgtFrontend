import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutation';
import { GET_CLIENTS } from '../queries/clientQueries';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AddClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const { name, email, phone } = formData;

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      return alert('Please add all field');
    }
    addClient(name, email, phone);
    toast.success(`${name} created successfully`)

    setFormData({ name: '', email: '', phone: '' });
  };
  return (
    <>
      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#addClientModel'
      >
        <div className='d-flex align-items-center'>
          <FaUser className='icon mx-2' />
          <div> Add Client</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addClientModel'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Add Client
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
                  <label htmlFor='name' className='form-label'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={handleInputChange}
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>
                    Phone
                  </label>
                  <input
                    type='text'
                    name='phone'
                    id='phone'
                    value={phone}
                    onChange={handleInputChange}
                    className='form-control'
                  />
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
  );
};

export default AddClientForm;

import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import DeleteProjectBtn from './DeleteProjectBtn';
import UpdateProjectBtn from './UpdateProjectBtn';

const ClientInfo = ({ client, project }) => {
  return (
    <>
      <h5 className='mt-5'>Client Information</h5>
      <ul className='list-group'>
        <li className='list-group-item'>
          <FaIdBadge className='icon mx-2' />
          {client.name}
        </li>
        <li className='list-group-item'>
          <FaEnvelope className='icon mx-2' />
          {client.email}
        </li>
        <li className='list-group-item'>
          <FaPhone className='icon mx-2' />
          {client.phone}
        </li>
      </ul>
      <div className='d-flex'>
        <UpdateProjectBtn project={project} />
        <DeleteProjectBtn project={project} />
      </div>
    </>
  );
};

export default ClientInfo;

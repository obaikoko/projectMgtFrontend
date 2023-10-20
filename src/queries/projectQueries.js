import { gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query getProjects {
    Projects {
      id
      name
      description
      status
      url
    }
  }
`;

const GET_PROJECT = gql`
 query getProject($id: ID!) {
    Project(id: $id) {
      name
      description
      status
      id
      url
      client{
        name
        email
        phone
        id
      }
    }
}
`;
export { GET_PROJECTS, GET_PROJECT };

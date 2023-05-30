import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String!
    $status: projectStatus!
    $clientId: ID!
  ) {
    addProject(
     name: $name 
    description: $description
    status: $status,
    clientId: $clientId
    ) {
    id
    name
    description
    status
    client {
      id
      name
      email
      phone
    }
  }
}
`;
const DELETE_PROJECT = gql`
mutation DeleteProject($id: ID!){
    deleteProject(id: $id) {
        id
        name
        description
        status
    }
}
`
const UPDATE_PROJECT = gql`
mutation UpdateProject(
  $id: ID! 
  $name: String! 
  $description: String! 
  $status: projectStatusUpdate!
   ){
  updateProject(
    id: $id, 
    name: $name, 
    description: $description, 
    status: $status
    ) {
    id
    name
    description
    status
    client{
      id
      name
      email
      phone
    }
  }
}
`
export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };

import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    Clients {
      id
      name
      email
      phone
    }
  }
`;
export {GET_CLIENTS}
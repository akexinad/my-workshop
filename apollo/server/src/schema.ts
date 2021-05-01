import { gql } from "apollo-server";

export const typeDefs = gql`
    type Query {
        launches: [Launch]!
    }

    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }
    
    type User {
        id: ID!
        email: String!
        profileImage: String
        trips: [Launch]!
        token: String
    }
    
    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }
    
    enum PatchSize {
        SMALL
        LARGE
    }
`;

import { LaunchAPI } from "../datasources/launch";
import { UserAPI } from "../datasources/user";
import { Launch, LaunchConnection, Maybe } from "./generated";

export type ApolloContext = {
    dataSources: {
        launchAPI: LaunchAPI;
        userAPI: UserAPI;
    };
};

export type User = {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    token: string;
};

type SearchParams = {
    where: {
        email?: string;
        id?: number;
        username?: string;
    }
}

export type UserORM = User[] & {
    findOrCreate: (params: SearchParams) => Promise<User[] | null>;
};

export type Trip = {
    id: number;
    createdAt: string;
    updatedAt: string;
    launchId: number;
    userId: number;
};

export type Store = {
    users: UserORM;
    trips: Trip[];
};

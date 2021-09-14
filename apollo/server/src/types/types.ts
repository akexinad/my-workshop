import { LaunchAPI } from "../datasources/launch";
import { UserAPI } from "../datasources/user";

export type ApolloContext = {
    dataSources: {
        launchAPI: LaunchAPI;
        userAPI: UserAPI;
    };
};

import { ApolloServer } from "apollo-server";
import env from "dotenv";
import "reflect-metadata"; // Package required for decorators to work.
import { buildSchema } from "type-graphql";
// import { mocks } from "./data/mockData";
import { LaunchAPI } from "./dataSources/launch";
import { TrackResolver } from "./resolvers/track";

const main = async () => {
    env.config();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TrackResolver],
            validate: false
        }),
        // mocks: mocks,
        dataSources: () => ({
            launchAPI: new LaunchAPI()
        })
    });

    apolloServer.listen().then(() => {
        console.log(
            `\nServer is running on http://localhost:${process.env.PORT}`,
            `\nYou can also query at https://studio.apollographql.com/dev\n`
        );
    });
};

main();

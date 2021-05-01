import { ApolloServer } from "apollo-server";
import env from "dotenv";
import "reflect-metadata"; // Package required for decorators to work.
import { LaunchAPI } from "./dataSources/launch";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const main = async () => {
    env.config();

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: {
            foo: "bar"
        },
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

import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import IsEmail from "isemail";
import { LaunchAPI } from "./datasources/launch";
import { UserAPI } from "./datasources/user";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { createStore } from "./utils";

dotenv.config();

const store = createStore();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    /**
     * Although we defined dataSources outside of context,
     * it is automatically included for each operation.
     */
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store }),
    }),
    context: async (ctx) => {
        const auth = (ctx.req.headers && ctx.req.headers.authorization) || "";

        const email = Buffer.from(auth, "base64").toString("ascii");

        if (!IsEmail.validate(email))
            return {
                user: null,
            };

        const users = await store.users.findOrCreate({ where: { email } });

        const user = (users && users[0]) || null;

        return {
            user: { ...user.dataValues },
        };
    },
});

server.listen().then(({ port }) => {
    console.log(`
      Server is running!
      Listening on port ${port}
      Explore at https://studio.apollographql.com/sandbox
    `);
});

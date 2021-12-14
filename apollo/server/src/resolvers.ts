import { Launch, LaunchConnection, Resolvers } from "./types/generated";
import { ApolloContext } from "./types/types";
import { paginateResults } from "./utils";

export const resolvers: Resolvers<ApolloContext> = {
    Query: {
        launch: (parent, args, context, info) => {
            return context.dataSources.launchAPI.getLaunchById({
                launchId: args.id,
            });
        },
        launches: async (_, args, context) => {
            const allLaunches =
                await context.dataSources.launchAPI.getAllLaunches();

            allLaunches.reverse();

            const launches = paginateResults({
                after: args.after,
                pageSize: args.pageSize,
                results: allLaunches,
            });

            return {
                launches,
                cursor: launches.length
                    ? launches[launches.length - 1].cursor
                    : "",
                hasMore: launches.length
                    ? launches[launches.length - 1].cursor !==
                      allLaunches[allLaunches.length - 1].cursor
                    : false,
            };
        },
        me: (_, __, context) => {
            return context.dataSources.userAPI.findOrCreateUser();
        },
    },
    Mutation: {
        login: async (_, args, ctx) => {
            const user = await ctx.dataSources.userAPI.findOrCreateUser({
                email: args.email,
            });

            const email = args.email as string;

            console.log(`user`, user);

            if (user) {
                user.token = Buffer.from(email).toString("base64");
                return user;
            }
        },

        bookTrips: async (_, args, ctx) => {
            const results = await ctx.dataSources.userAPI.bookTrips({
                launchIds: args.launchIds,
            });

            console.log(`results`, results)

            const launches = await ctx.dataSources.launchAPI.getLaunchesByIds({
                launchIds: args.launchIds,
            });

            return {
                success: results! && results.length === args.launchIds.length,
                message:
                    results!.length === args.launchIds.length
                        ? "trips booked successfully"
                        : `the following launches couldn't be booked: ${args.launchIds.filter(
                              (id) => !results?.includes(id)
                          )}`,
                launches,
            };
        },

        cancelTrip: async (_, args, ctx) => {
            const result = await ctx.dataSources.userAPI.cancelTrip({
                launchId: args.launchId,
            });

            if (!result) {
                return {
                    success: false,
                    message: "failed to cancel trip",
                };
            }

            const launch = await ctx.dataSources.launchAPI.getLaunchById({
                launchId: args.launchId,
            });

            return {
                success: true,
                message: "trip cancelled",
                launches: [launch],
            };
        },
    },
    Mission: {
        // return 'LARGE' if args not provided.
        missionPatch: (mission, args) => {
            return args.size === "SMALL"
                ? (mission.missionPatch = "SMALL")
                : (mission.missionPatch = "LARGE");
        },
    },
    Launch: {
        isBooked: async (launch, _, { dataSources }) =>
            dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
    },
    User: {
        trips: async (_, __, { dataSources }) => {
            // get ids of launches by user
            const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
            if (!launchIds.length) return [];
            // look up those launches by their ids
            return (
                dataSources.launchAPI.getLaunchesByIds({
                    launchIds,
                }) || []
            );
        },
    },
};

/**
 * 
 * fieldName: (parent, args, context, info) => data;
 * 
 * module.exports = {
  Query: {
    launches: (_, __, { dataSources }) =>
      dataSources.launchAPI.getAllLaunches(),
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
  }
};
 */

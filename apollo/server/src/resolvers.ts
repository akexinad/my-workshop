export const resolvers = {
    Query: {
        launches: (parent: any, args: any, ctx: any, info: any) => {
            console.log(`parent`, parent);
            console.log(`args`, args);
            console.log(`ctx`, ctx);
            console.log(`info`, info);

            
            
            return ctx.dataSources.launchAPI.getAllLaunches()
        }
    }
};

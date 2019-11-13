module.exports = {
    Query: {
        launches: (_, __, { dataSources }) => {
            return dataSources.launchAPI.getAllLaunches();
        },

        launch: (_, { id }, { dataSources }) => {
            return dataSources.launchAPI.getLaunchById({ launchId: id });
        },

        me: (_, __, { dataSources }) => {
            return dataSources.userAPI.findOrCreateUser();
        }
    }
};
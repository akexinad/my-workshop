// import { DataSourceConfig } from "apollo-datasource";
import { RESTDataSource } from "apollo-datasource-rest";
import { LaunchData } from "src/types";

export class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.spacexdata.com/v2/";
        /**
         * See: https://github.com/apollographql/apollo-server/issues/3429
         *
         * I think the issue arises from the fact that apollo is being paired with
         * type-graphql whose buildSchema function is asynchronous,
         * compared to the non-asynchronous buildSchema function of the
         * normal graphql library.
         *
         * Thus we need to call initialize in the constructor to initialise the connection:
         * 
         * this.initialize({} as DataSourceConfig<any>);
         * 
         * You can also initialize httpCache() as is dont here:
         * https://github.com/apollographql/apollo-server/issues/2240#issuecomment-508516969
         */
        // this.httpCache = new HTTPCache()
    }

    async getAllLaunches() {
        const response = await this.get("launches");

        return Array.isArray(response)
            ? response.map((launch) => this.launchReducer(launch))
            : [];
    }

    launchReducer(launch: LaunchData) {
        return {
            id: launch.flight_number || 0,
            cursor: `${launch.launch_date_unix}`,
            site: launch.launch_site && launch.launch_site.site_name,
            mission: {
                name: launch.mission_name,
                missionPatchSmall: launch.links.mission_patch_small,
                missionPatchLarge: launch.links.mission_patch
            },
            rocket: {
                id: launch.rocket.rocket_id,
                name: launch.rocket.rocket_name,
                type: launch.rocket.rocket_type
            }
        };
    }

    async getLaunchById({ launchId }: any) {
        const response = await this.get("launches", {
            flight_number: launchId
        });
        return this.launchReducer(response[0]);
    }

    getLaunchesByIds({ launchIds }: any) {
        return Promise.all(
            launchIds.map((launchId: any) => this.getLaunchById({ launchId }))
        );
    }
}

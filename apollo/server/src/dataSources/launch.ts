import { RESTDataSource } from "apollo-datasource-rest";
import { LaunchData } from "src/types";

export class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.spacexdata.com/v2/";
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

import { RESTDataSource } from "apollo-datasource-rest";

type LaunchRocket = {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
};

type LaunchSite = {
    site_name: string;
};

type LaunchLinks = {
    mission_patch_small: string;
    mission_patch: string;
};

type LaunchReducer = {
    flight_number: string;
    launch_date_unix: string;
    launch_site: LaunchSite;
    mission_name: string;
    links: LaunchLinks;
    rocket: LaunchRocket;
    isBooked: boolean;
};

export class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.spacexdata.com/v2/";
    }

    private launchReducer = (launch: LaunchReducer) => {
        return {
            id: launch.flight_number || 0,
            cursor: `${launch.launch_date_unix}`,
            site: launch.launch_site && launch.launch_site.site_name,
            mission: {
                name: launch.mission_name,
                missionPatchSmall: launch.links.mission_patch_small,
                missionPatchLarge: launch.links.mission_patch,
            },
            rocket: {
                id: launch.rocket.rocket_id,
                name: launch.rocket.rocket_name,
                type: launch.rocket.rocket_type,
            },
            isBooked: launch.isBooked,
        } as any;
    };

    async getAllLaunches() {
        const response = await this.get("launches");

        return Array.isArray(response)
            ? response.map((launch) => this.launchReducer(launch))
            : [];
    }

    async getLaunchById({ launchId }: any) {
        const response = await this.get("launches", {
            flight_number: launchId,
        });

        return this.launchReducer(response[0]);
    }

    getLaunchesByIds(obj: any) {
        const launchIds: string[] = obj.launchIds;

        return Promise.all(
            launchIds.map((launchId) => this.getLaunchById({ launchId }))
        );
    }
}

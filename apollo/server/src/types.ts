import { LaunchAPI } from "./dataSources/launch";

export type LaunchData = {
    flight_number: number;
    launch_date_unix: string;
    launch_site: {
        site_name: string;
    };
    mission_name: string;
    links: {
        mission_patch_small: string;
        mission_patch: string;
    };
    rocket: {
        rocket_id: string;
        rocket_name: string;
        rocket_type: string;
    };
};

export type MyCtx = {
    launchAPI: LaunchAPI;
    dataSources: {
        launchAPI: LaunchAPI;
    };
};

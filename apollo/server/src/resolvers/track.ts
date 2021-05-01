import { Track } from "../entities/Track";
import { Ctx, Query, Resolver } from "type-graphql";
import { LaunchAPI } from "../dataSources/launch";
import { Launch } from "../entities/Launch";

type MyCtx = {
    dataSources: () => {
        launchAPI: LaunchAPI
    }
}

@Resolver(Track)
export class TrackResolver {
    @Query(() => [Launch])
    async tracksForHome(
        @Ctx() ctx: MyCtx
    ) {
        return await ctx.dataSources().launchAPI.getAllLaunches()
        
        // const track: Track = {
        //     id: "13h8f138hf0183274r017234",
        //     author: {
        //         id: "181hf813hfp8134r",
        //         name: "fellini",
        //         photo: "photo"
        //     },
        //     length: 5,
        //     modulesCount: 4,
        //     thumbnail: "thumbnail", 
        //     title: "title"
        // };

        // return [track];
    }
}

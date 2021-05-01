import { MyCtx } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";
import { Launch } from "../entities/Launch";
import { Track } from "../entities/Track";

@Resolver(Track)
export class TrackResolver {
    @Query(() => [Launch])
    async tracksForHome(@Ctx() ctx: MyCtx) {

        return await ctx.dataSources.launchAPI.getAllLaunches();

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

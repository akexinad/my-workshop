import { Query, Resolver } from "type-graphql";
import { Track } from "../entities/Track";

@Resolver(Track)
export class TrackResolver {
    @Query(() => [Track])
    async tracksForHome() {
        const track: Track = {
            id: "13h8f138hf0183274r017234",
            author: {
                id: "181hf813hfp8134r",
                name: "fellini",
                photo: "photo"
            },
            length: 5,
            modulesCount: 4,
            thumbnail: "thumbnail",
            title: "title"
        };

        return [track];
    }
}

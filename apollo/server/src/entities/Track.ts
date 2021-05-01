import { Field, ID, Int, ObjectType } from "type-graphql";
import { Author } from "./Author";

/**
 * A track is a group of modules that teaches about a specific topic
 */

@ObjectType()
export class Track {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    title: string;

    @Field(() => Author)
    author: Author;

    @Field(() => String, { nullable: true })
    thumbnail: string;

    @Field(() => Int, { nullable: true })
    length: number;

    @Field(() => Int, { nullable: true })
    modulesCount: number;
}

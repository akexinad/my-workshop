import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Launch {
    @Field(() => ID)
    id: number;

    @Field(() => String)
    cursor: string;

    @Field(() => String)
    site: string;

    mission: {
        name: string;
        missionPatchSmall: string;
        missionPatchLarge: string;
    };

    rocket: {
        id: string;
        name: string;
        type: string;
    };
}

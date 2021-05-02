import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Mission {
    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => String, { nullable: true })
    missionPatch: string;
}

@ObjectType()
class Rocket {
    @Field(() => ID)
    id: string;

    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => String, { nullable: true })
    type: string;
}

@ObjectType()
export class Launch {
    @Field(() => ID)
    id: number;

    @Field(() => String)
    cursor: string;

    @Field(() => String, { nullable: true })
    site: string;

    @Field(() => Mission, { nullable: true })
    mission: Mission;

    @Field(() => Rocket, { nullable: true })
    rocket: Rocket;
}

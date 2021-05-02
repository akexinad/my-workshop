import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Mission {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    missionPatch: string;
}

@ObjectType()
class Rocket {
    @Field(() => ID)
    id: string;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    type: string;
}

@ObjectType()
export class Launch {
    @Field(() => ID)
    id: number;

    @Field()
    cursor: string;

    @Field({ nullable: true })
    site: string;

    @Field(() => Mission, { nullable: true })
    mission: Mission;

    @Field(() => Rocket, { nullable: true })
    rocket: Rocket;
}

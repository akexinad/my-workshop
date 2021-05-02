import { Launch } from "../entities/Launch";
import { MyCtx } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver(Launch)
export class LaunchResolver {
    @Query(() => [Launch])
    async launches(@Ctx() ctx: MyCtx) {
        return await ctx.dataSources.launchAPI.getAllLaunches();
    }
}

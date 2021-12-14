import React, { Fragment, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { useGetLaunchListQuery } from "../generated/graphql";
import { Button, Header, LaunchTile, Loading } from "../components";

interface LaunchesProps extends RouteComponentProps {}

const Launches: React.FC<LaunchesProps> = () => {
    const { data, loading, error, fetchMore } = useGetLaunchListQuery();

    const [isLoadingMore, setIsLoadingMore] = useState(false);

    if (loading) return <Loading />;

    if (error) return <h1 style={{ color: "red" }}>THERE WAS ERROR</h1>;

    if (!data) return <h1 style={{ color: "red" }}>404: NOT FOUND</h1>;

    return (
        <>
            <Header />
            {data.launches &&
                data.launches.launches &&
                data.launches.launches.map((launch) =>
                    launch ? (
                        <LaunchTile key={launch.id} launch={launch} />
                    ) : null
                )}
            {data.launches &&
                data.launches.hasMore &&
                (isLoadingMore ? (
                    <Loading />
                ) : (
                    <Button
                        onClick={async () => {
                            setIsLoadingMore(true);
                            await fetchMore({
                                variables: {
                                    after: data.launches.cursor,
                                },
                            });
                            setIsLoadingMore(false);
                        }}
                    >
                        Load More
                    </Button>
                ))}
        </>
    );
};

export default Launches;

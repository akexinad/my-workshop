import React, { FC } from 'react';
import { Layout } from '../components';

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
type TracksProps = {
  path: string
}

const Tracks: FC<TracksProps> = () => {
  return <Layout grid> </Layout>;
};

export default Tracks;
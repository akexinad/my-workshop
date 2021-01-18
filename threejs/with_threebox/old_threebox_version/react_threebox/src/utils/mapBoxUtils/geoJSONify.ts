interface GeoJSONData {
    type: string;
    features: GeoJSONFeature[];
}

interface GeoJSONFeature {
    type: string;
    properties: {
        shape_area: string;
        basezone: string;
        zoning: string;
        objectid: string;
        shape_length: string;
    };
    geometry: {
        type: string;
        coordinates: number[][][][];
    };
}

interface basezoneItem {
    basezone: string;
    source: GeoJSONSource;
}

interface GeoJSONSource {
    type: string;
    data: GeoJSONData;
}

interface basezoneLayerItem {
    basezone: string;
    layer: mapboxgl.Layer;
}

export class GeoJSONify {
    public geoJSONData: GeoJSONData;
    public zoningList: GeoJSONFeature["properties"]["zoning"][];
    public basezoneList: GeoJSONFeature["properties"]["basezone"][];
    public sourceListByBasezone: basezoneItem[];
    public layerListByBasezone: basezoneLayerItem[];

    constructor(geoJSONData: GeoJSONData) {
        this.geoJSONData = geoJSONData;
        this.zoningList = this.listZonings();
        this.basezoneList = this.listbasezones();
        this.sourceListByBasezone = this.filterByBasezone();
        this.layerListByBasezone = this.createMapboxLayersByBasezone();
    }

    private listZonings = () => {
        const allZoningsWithDuplicates: string[] = [];

        this.geoJSONData.features.forEach((feature: GeoJSONFeature) => {
            allZoningsWithDuplicates.push(feature.properties.zoning);
        });

        const unique = allZoningsWithDuplicates.filter(
            (value: string, index: number, self: string[]) => {
                return self.indexOf(value) === index;
            }
        );

        return unique;
    };

    private listbasezones = () => {
        const allBasezonesWithDuplicates: string[] = [];

        this.geoJSONData.features.forEach((feature: GeoJSONFeature) => {
            allBasezonesWithDuplicates.push(feature.properties.basezone);
        });

        const unique = allBasezonesWithDuplicates.filter(
            (value: string, index: number, self: string[]) => {
                return self.indexOf(value) === index;
            }
        );

        return unique;
    };

    private filterByBasezone = () => {
        const dataBybasezone: basezoneItem[] = [];

        this.basezoneList.forEach((basezone: string) => {
            const features: GeoJSONFeature[] = [];

            this.geoJSONData.features.forEach((feature: GeoJSONFeature) => {
                if (feature.properties.basezone === basezone) {
                    features.push(feature);
                }
            });

            dataBybasezone.push({
                basezone: basezone,
                source: {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: features
                    }
                }
            });
        });

        return dataBybasezone;
    };

    private createMapboxLayersByBasezone() {
        const layersBybasezone: basezoneLayerItem[] = [];

        this.sourceListByBasezone.forEach((item: basezoneItem) => {
            let color = "#" + Math.floor(Math.random() * 999999);

            layersBybasezone.push({
                basezone: item.basezone,
                layer: {
                    id: `santa_clara_zone_${item.basezone.toLowerCase()}`,
                    type: "fill",
                    // @ts-ignore
                    source: item.source,
                    layout: {},
                    paint: {
                        "fill-color": color,
                        "fill-opacity": 0.8
                    }
                }
            });
        });

        return layersBybasezone;
    }
}

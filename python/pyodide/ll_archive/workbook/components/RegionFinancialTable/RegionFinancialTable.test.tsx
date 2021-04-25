import { mount, ReactWrapper } from "enzyme";
import {
  mockRegionDataReadOnly,
  mockRegionDataWithCodeBlocks
} from "pages/workbook/data/mockRegionData";
import React from "react";
import RegionFinancialTable from "./RegionFinancialTable";

let wrapper: ReactWrapper;

afterEach(() => {
  wrapper.unmount();
});

describe("the RegionFinancialTable component with readonly data", () => {
  beforeEach(() => {
    wrapper = mount(<RegionFinancialTable region={mockRegionDataReadOnly} />);
  });

  it("should render a standard table with no frozen columns", () => {
    expect(wrapper.find("StickyTable")).toHaveLength(0);
    expect(wrapper.find("StandardTable")).toHaveLength(1);
  });
});

describe("the RegionFinancialTable component with readonly data", () => {
  beforeEach(() => {
    wrapper = mount(
      <RegionFinancialTable region={mockRegionDataWithCodeBlocks} />
    );
  });

  it("should render a standard table with no frozen columns", () => {
    expect(wrapper.find("StickyTable")).toHaveLength(1);
    expect(wrapper.find("StandardTable")).toHaveLength(0);
  });
});

import { mount, ReactWrapper } from "enzyme";
import {
  mockRegionDataNoHeaderNoFooter,
  mockRegionDataReadOnly
} from "pages/workbook/data/mockRegionData";
import React from "react";
import RegionView from "./RegionView";

let wrapper: ReactWrapper;

afterEach(() => {
  wrapper.unmount();
});

describe("The RegionView component with dates", () => {
  beforeEach(() => {
    wrapper = mount(<RegionView region={mockRegionDataReadOnly} />);
  });

  it("should display an h2 title, two datepickers and a table", () => {
    expect(wrapper.find("h2")).toHaveLength(1);
  });

  it("should display two datepickers", () => {
    expect(wrapper.find("DatePicker")).toHaveLength(2);
  });

  it("should display a standard financial table", () => {
    expect(wrapper.find("RegionFinancialTable")).toHaveLength(1);
    expect(wrapper.find("StandardTable")).toHaveLength(1);
  });
});

describe("The RegionView component without dates", () => {
  beforeEach(() => {
    wrapper = mount(<RegionView region={mockRegionDataNoHeaderNoFooter} />);
  });

  it("should display an h2 title, two datepickers and a table", () => {
    expect(wrapper.find("h2")).toHaveLength(1);
  });

  it("should display two datepickers", () => {
    expect(wrapper.find("DatePicker")).toHaveLength(0);
  });

  it("should display a financial with frozen columns", () => {
    expect(wrapper.find("RegionFinancialTable")).toHaveLength(1);
    expect(wrapper.find("StickyTable")).toHaveLength(1);
  });
});

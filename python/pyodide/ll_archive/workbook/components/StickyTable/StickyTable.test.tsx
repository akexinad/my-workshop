import { mount, ReactWrapper } from "enzyme";
import {
  mockRegionDataNoHeaderNoFooter,
  mockRegionDataWithCodeBlocks
} from "pages/workbook/data/mockRegionData";
import { createRegionFinancialTable } from "pages/workbook/utils/utils";
import React from "react";
import StickyTable from "./StickyTable";

let wrapper: ReactWrapper;

describe("the financial table with code blocks and frozen columns", () => {
  const { hasHeader, hasFooter } = mockRegionDataWithCodeBlocks;
  const mockTable = createRegionFinancialTable(mockRegionDataWithCodeBlocks);

  beforeEach(() => {
    wrapper = mount(
      <StickyTable table={mockTable} header={hasHeader} footer={hasFooter} />
    );
  });

  it("should render the table", () => {
    expect(wrapper.find(".table")).toHaveLength(1);
  });

  it("should render 11 rows of data", () => {
    expect(wrapper.find(".tr")).toHaveLength(13);
  });

  it("should display a header", () => {
    expect(wrapper.find(".header")).toHaveLength(1);
    expect(wrapper.find(".th")).toHaveLength(17);
  });

  it("should display the footer", () => {
    expect(wrapper.find(".footer")).toHaveLength(1);
  });

  it("should not display inputs", () => {
    expect(wrapper.find("input")).toHaveLength(7);
  });
});

describe("the financial table with frozen columns and no header or footer", () => {
  const { hasHeader, hasFooter } = mockRegionDataNoHeaderNoFooter;
  const mockTable = createRegionFinancialTable(mockRegionDataNoHeaderNoFooter);

  beforeEach(() => {
    wrapper = mount(
      <StickyTable table={mockTable} header={hasHeader} footer={hasFooter} />
    );
  });

  it("should render the table", () => {
    expect(wrapper.find(".table")).toBeTruthy();
  });

  it("should render 11 rows of data", () => {
    expect(wrapper.find(".tr")).toHaveLength(11);
  });

  it("should display a header", () => {
    expect(wrapper.find(".header")).toHaveLength(0);
    expect(wrapper.find(".th")).toHaveLength(0);
  });

  it("should display the footer", () => {
    expect(wrapper.find(".footer")).toHaveLength(0);
  });

  it("should display inputs", () => {
    expect(wrapper.find("input")).toHaveLength(7);
  });
});

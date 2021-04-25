import { mount, ReactWrapper } from "enzyme";
import {
  mockRegionDataNoHeaderNoFooterNoFrozenColumns,
  mockRegionDataReadOnly,
  mockRegionDataWithCodeBlocksNoFrozenColumns
} from "pages/workbook/data/mockRegionData";
import { createRegionFinancialTable } from "pages/workbook/utils/utils";
import React from "react";
import StandardTable from "./StandardTable";

let wrapper: ReactWrapper;

describe("the standard financial table with no code blocks", () => {
  const { hasHeader, hasFooter } = mockRegionDataReadOnly;
  const mockTable = createRegionFinancialTable(mockRegionDataReadOnly);

  beforeEach(() => {
    wrapper = mount(
      <StandardTable table={mockTable} header={hasHeader} footer={hasFooter} />
    );
  });

  it("should render the table", () => {
    expect(wrapper.find(".table")).toHaveLength(1);
  });

  it("should render 11 rows of data", () => {
    expect(wrapper.find("tr")).toHaveLength(13);
  });

  it("should display a header", () => {
    expect(wrapper.find("thead")).toHaveLength(1);
    expect(wrapper.find("th")).toHaveLength(17);
  });

  it("should display the footer", () => {
    expect(wrapper.find("tfoot")).toHaveLength(1);
  });

  it("should not display inputs", () => {
    expect(wrapper.find("input")).toHaveLength(0);
  });
});

describe("the standard financial table with code blocks", () => {
  const { hasHeader, hasFooter } = mockRegionDataWithCodeBlocksNoFrozenColumns;
  const mockTable = createRegionFinancialTable(
    mockRegionDataWithCodeBlocksNoFrozenColumns
  );

  beforeEach(() => {
    wrapper = mount(
      <StandardTable table={mockTable} header={hasHeader} footer={hasFooter} />
    );
  });

  it("should render the table", () => {
    expect(wrapper.find(".table")).toBeTruthy();
  });

  it("should render 11 rows of data", () => {
    expect(wrapper.find("tr")).toHaveLength(13);
  });

  it("should display a header", () => {
    expect(wrapper.find("thead")).toHaveLength(1);
    expect(wrapper.find("th")).toHaveLength(17);
  });

  it("should display the footer", () => {
    expect(wrapper.find("tfoot")).toBeTruthy();
  });

  it("should display inputs", () => {
    expect(wrapper.find("input")).toHaveLength(7);
  });
});

describe("the standard financial table with code blocks", () => {
  const {
    hasHeader,
    hasFooter
  } = mockRegionDataNoHeaderNoFooterNoFrozenColumns;

  const mockTable = createRegionFinancialTable(
    mockRegionDataNoHeaderNoFooterNoFrozenColumns
  );

  beforeEach(() => {
    wrapper = mount(
      <StandardTable table={mockTable} header={hasHeader} footer={hasFooter} />
    );
  });

  it("should render the table", () => {
    expect(wrapper.find(".table")).toBeTruthy();
  });

  it("should render 11 rows of data", () => {
    expect(wrapper.find("tr")).toHaveLength(11);
  });

  it("should NOT display a header", () => {
    expect(wrapper.find("thead")).toHaveLength(0);
    expect(wrapper.find("th")).toHaveLength(0);
  });

  it("should NOT display the footer", () => {
    expect(wrapper.find("tfoot")).toHaveLength(0);
  });
});

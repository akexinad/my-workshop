import {
  mockRegionDataNoHeaderNoFooter,
  mockRegionDataReadOnly,
  mockRegionDataWithCodeBlocks
} from "../data/mockRegionData";
import { capitalizeEach, createRegionFinancialTable } from "./utils";

describe("the capitalizeEach util", () => {
  it("should capitalize each word", () => {
    const capitalised = "Hello World";

    const helloWorld = capitalizeEach("hello world");

    expect(helloWorld).toBe(capitalised);
  });

  it("should return the original string", () => {
    const number = 1234;

    const capitalised = capitalizeEach("1234");

    expect(capitalised).toEqual(number.toString());
  });
});

describe("the createRegionTable util", () => {
  const tableWithHeaders = createRegionFinancialTable(mockRegionDataWithCodeBlocks);

  it("should return the first 5 table columns with property of sticky", () => {
    expect(tableWithHeaders.columns[0]).toHaveProperty("sticky");
    expect(tableWithHeaders.columns[1]).toHaveProperty("sticky");
    expect(tableWithHeaders.columns[2]).toHaveProperty("sticky");
    expect(tableWithHeaders.columns[3]).toHaveProperty("sticky");
    expect(tableWithHeaders.columns[4]).toHaveProperty("sticky");
    expect(tableWithHeaders.columns[6]).not.toHaveProperty("sticky");
    expect(tableWithHeaders.columns[7]).not.toHaveProperty("sticky");
  });

  it("should have rows whose key should correspond to the column's accessor", () => {
    const rowKeys = Object.keys(tableWithHeaders.rows[0]);
    const accessors = tableWithHeaders.columns.map((column) => column.accessor);

    rowKeys.forEach((key, index) => {
      expect(key).toEqual(accessors[index]);
    });
  });

  const tableWithoutHeaders = createRegionFinancialTable(mockRegionDataNoHeaderNoFooter);

  it("should return no sticky columns", () => {
    expect(tableWithoutHeaders.columns[0]).not.toHaveProperty("sticky");
    expect(tableWithoutHeaders.columns[1]).not.toHaveProperty("sticky");
    expect(tableWithoutHeaders.columns[2]).not.toHaveProperty("sticky");
    expect(tableWithoutHeaders.columns[3]).not.toHaveProperty("sticky");
  });

  it("should have rows whose key should correspond to the column's accessor DESPITE the absence of a header in the data", () => {
    const rowKeys = Object.keys(tableWithoutHeaders.rows[0]);
    const accessors = tableWithoutHeaders.columns.map(
      (column) => column.accessor
    );

    rowKeys.forEach((key, index) => {
      expect(key).toEqual(accessors[index]);
    });
  });
});

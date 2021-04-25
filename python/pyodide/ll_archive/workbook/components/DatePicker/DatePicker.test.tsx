import { ReactWrapper, mount } from "enzyme";
import React from "react";
import DatePicker from "./DatePicker";

let wrapper: ReactWrapper;

afterEach(() => {
  wrapper.unmount();
});

const INPUT = "input";

describe("the DatePicker component with correct data", () => {
  beforeEach(() => {
    wrapper = mount(<DatePicker date="05/10/1950" title={"Date"} />);
  });

  it("should display 3 divs", () => {
    expect(wrapper.find("div")).toHaveLength(3);
  });

  it("should display 3 inputs", () => {
    expect(wrapper.find(INPUT)).toHaveLength(3);
  });

  it("should display the month, date and year accordingly", () => {
    expect(wrapper.find(INPUT).first().prop("value")).toEqual("05");
    expect(wrapper.find(INPUT).at(1).prop("value")).toEqual("10");
    expect(wrapper.find(INPUT).last().prop("value")).toEqual("1950");
  });

  it("should change the month, date and year accordingly", () => {
    wrapper
      .find(INPUT)
      .first()
      .simulate("change", { target: { value: "04" } });

    wrapper
      .find(INPUT)
      .at(1)
      .simulate("change", { target: { value: "30" } });

    wrapper
      .find(INPUT)
      .last()
      .simulate("change", { target: { value: "2020" } });

    expect(wrapper.find(INPUT).first().prop("value")).toEqual("04");
    expect(wrapper.find(INPUT).at(1).prop("value")).toEqual("30");
    expect(wrapper.find(INPUT).last().prop("value")).toEqual("2020");
  });

  it("should not change the input if the user inserts letters", () => {
    wrapper
      .find(INPUT)
      .first()
      .simulate("change", { target: { value: "re" } });

    wrapper
      .find(INPUT)
      .at(1)
      .simulate("change", { target: { value: "gh" } });

    wrapper
      .find(INPUT)
      .last()
      .simulate("change", { target: { value: "werq" } });

    expect(wrapper.find(INPUT).first().prop("value")).toEqual("05");
    expect(wrapper.find(INPUT).at(1).prop("value")).toEqual("10");
    expect(wrapper.find(INPUT).last().prop("value")).toEqual("1950");

    expect(wrapper.find(".invalid")).toHaveLength(0)
  });

  it("should change the border colour to red when invalid dates are given", () => {
    wrapper
      .find(INPUT)
      .first()
      .simulate("change", { target: { value: "2" } });

    wrapper
      .find(INPUT)
      .at(1)
      .simulate("change", { target: { value: "30" } });

    expect(wrapper.find(".invalid")).toHaveLength(1)
  });
});

describe("the DatePicker component with incorrect data", () => {
  beforeEach(() => {
    wrapper = mount(<DatePicker date="foobar" title={"Date"} />);
  });

  it("should display todays date", () => {
    expect(wrapper.find(INPUT).first().prop("value")).toEqual("");
    expect(wrapper.find(INPUT).at(1).prop("value")).toEqual("");
    expect(wrapper.find(INPUT).last().prop("value")).toEqual("");
  });
});

describe("the DatePicker component with null date", () => {
  beforeEach(() => {
    wrapper = mount(<DatePicker date={""} title={"Date"} />);
  });

  it("should display todays date", () => {
    expect(wrapper.find(INPUT).first().prop("value")).toEqual("");
    expect(wrapper.find(INPUT).at(1).prop("value")).toEqual("");
    expect(wrapper.find(INPUT).last().prop("value")).toEqual("");
  });
});

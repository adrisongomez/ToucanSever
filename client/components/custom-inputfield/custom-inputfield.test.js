import CustomInputField from "./custom-inputfield.components";
import { shallow } from "enzyme";

describe("CustomInputField component", () => {
  it("should has a onChange props", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<CustomInputField onChange={onChange} />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { name: "", value: "TEST" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("should has a value props, placeholder", () => {
    const value = "TEST VALUE",
      placehoder = "PLACEHODER VALUE",
      name = "name";
    const wrapper = shallow(<CustomInputField value={value} placeholder={placehoder} name={name} />);
    expect(wrapper.find("input").at(0).prop("value")).toBe(value);
    expect(wrapper.find("input").at(0).prop("placeholder")).toBe(placehoder);
    expect(wrapper.find("input").at(0).prop("name")).toBe(name);
  });

  it("should has a label props, placeholder", () => {
    const label = "LABEL VALUE",
      name = "name";
    const wrapper = shallow(<CustomInputField label={label} name={name} />);
    expect(wrapper.find("label").at(0).text()).toBe(label);
    expect(wrapper.find("label").at(0).prop("for")).toBe(name);
  });
});

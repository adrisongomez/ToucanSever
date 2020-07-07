import CustomInputField from "./custom-inputfield.components";
import { CustomInputText } from "./custom-inputfield.styles";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("CustomInputField component", () => {
  it("should has a onChange props", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<CustomInputField onChange={onChange} />);
    wrapper
      .find(CustomInputText)
      .at(0)
      .simulate("change", { target: { name: "", value: "TEST" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("should has a value props, placeholder", () => {
    const value = "TEST VALUE",
      placehoder = "PLACEHODER VALUE",
      name = "name";
    const wrapper = shallow(<CustomInputField value={value} placeholder={placehoder} name={name} />);
    expect(wrapper.find(CustomInputText).at(0).prop("value")).toBe(value);
    expect(wrapper.find(CustomInputText).at(0).prop("placeholder")).toBe(placehoder);
    expect(wrapper.find(CustomInputText).at(0).prop("name")).toBe(name);
  });

  it("should match with snapshop", () => {
    const wrapper = shallow(<CustomInputField {...{ placeholder: "", onChange: () => {}, name: "name" }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

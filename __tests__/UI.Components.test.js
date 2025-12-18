import { render, fireEvent } from "@testing-library/react-native";
import Button from "../src/components/ui/Button";
import Input from "../src/components/ui/Input";

describe("components-test", () => {
  it("test button title", () => {
    const { getByText } = render(<Button title="Button Title" />);
    expect(getByText("Button Title")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPressMock} />
    );

    fireEvent.press(getByText("Click me"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("should render with default props", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);

    expect(getByPlaceholderText("Enter text")).toBeTruthy();
  });

  it("should apply extra styles", () => {
    const extraStyles = { color: "red" };
    const { getByPlaceholderText } = render(
      <Input placeholder="Test" extraStyles={extraStyles} />
    );

    const input = getByPlaceholderText("Test");
    expect(input.props.style).toContainEqual(extraStyles);
  });

  it("should pass through TextInput props", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Test" maxLength={10} editable={false} />
    );

    const input = getByPlaceholderText("Test");
    expect(input.props.maxLength).toBe(10);
    expect(input.props.editable).toBe(false);
  });


  
});

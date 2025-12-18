import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import useDebounce from "../src/hooks/useDebounce";
import { act } from "react-test-renderer";

jest.useFakeTimers();

const TestComponent = ({ value, delay }) => {
  const debouncedValue = useDebounce(value, delay);
  return <Text testID="debounced-value">{debouncedValue}</Text>;
};

describe("useDebounce hook", () => {
  it("should render initial value", () => {
    const { getByTestId } = render(<TestComponent value="hello" delay={500} />);
    expect(getByTestId("debounced-value").props.children).toBe("hello");
  });

  it("should update value after delay", () => {
    let value = "first";
    const { getByTestId, rerender } = render(
      <TestComponent value={value} delay={500} />
    );

    // Change value
    value = "second";
    rerender(<TestComponent value={value} delay={500} />);

    // Still old value before delay
    expect(getByTestId("debounced-value").props.children).toBe("first");

    // Advance timers
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(getByTestId("debounced-value").props.children).toBe("second");
  });
});

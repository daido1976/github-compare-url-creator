import { renderHook, act } from "@testing-library/react-hooks";
import { render, fireEvent } from "@testing-library/react";
import { useTextField } from "./useTextField";

describe("useTextField", () => {
  it("should initialize values", () => {
    const {
      result: {
        current: [textField, _setValue],
      },
    } = renderHook(() => useTextField({ placeholder: "org", key: "org" }));

    expect(textField.type).toBe("text");
    expect(textField.value).toBe("");
    expect(textField.placeholder).toBe("org");
  });

  it("should update state on changing", () => {
    const { result } = renderHook(() =>
      useTextField({ placeholder: "org", key: "org" })
    );

    const { container } = render(<input {...result.current[0]} />);
    const input = container.querySelector("input");

    act(() => {
      fireEvent.change(input!, { target: { value: "updateOrg" } });
    });

    expect(result.current[0].value).toBe("updateOrg");
  });

  it("should update state on setting", () => {
    const { result } = renderHook(() =>
      useTextField({ placeholder: "org", key: "org" })
    );

    act(() => {
      result.current[1]("updateOrg");
    });

    expect(result.current[0].value).toBe("updateOrg");
  });
});

import { fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useOnline } from ".";

describe("useOnline unit test", () => {
  it("check return value", () => {
    const { result } = renderHook(() => useOnline());
    fireEvent(window, new Event("online"));
    expect(result.current).toBe(true || false);
  });
});

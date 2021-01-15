import { Button } from ".";
import { render } from "@testing-library/react";

describe("Button unit test", () => {
  it("Snapshot", () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });
});

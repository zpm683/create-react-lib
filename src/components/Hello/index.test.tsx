import { Hello } from ".";
import { render } from "@testing-library/react";

describe("Button unit test", () => {
  it("Snapshot", () => {
    const { container } = render(<Hello />);
    expect(container).toMatchSnapshot();
  });
});

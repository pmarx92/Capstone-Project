import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import FormModal from "./index";

test("should display the children and the close button", () => {
  const handleClose = jest.fn();

  const { getByText } = render(
    <FormModal close={handleClose}>
      <div>test</div>
    </FormModal>
  );
  expect(getByText("test")).toBeTruthy();

  fireEvent.click(getByText(/close/i));

  expect(handleClose).toHaveBeenCalledTimes(1);
});

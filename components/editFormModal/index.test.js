import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import EditFormModal from "./index";

test("should display the children and the close button", () => {
  const handleClose = jest.fn();

  const { getByText } = render(
    <EditFormModal close={handleClose}>
      <div>test</div>
    </EditFormModal>
  );
  expect(getByText("test")).toBeTruthy();

  fireEvent.click(getByText(/close/i));

  expect(handleClose).toHaveBeenCalledTimes(1);
});

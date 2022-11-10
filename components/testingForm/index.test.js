import "@testing-library/jest-dom";
import "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import TestingForm from "./index";

describe("first", () => {
  test("checks if the form is valid", async () => {
    render(<TestingForm />);

    const form = screen.getByTestId("form");
    const submitbtn = screen.getByRole("button", { name: "Submit" });
    const getNameInputfield = screen.getByTestId("name");
    const getWeightInputfield = screen.getByTestId("weight");
    const getLengthInputfield = screen.getByTestId("length");
    const getLocationInputfield = screen.getByTestId("location");

    await userEvent.type(getNameInputfield, "Lachs");
    await userEvent.type(getWeightInputfield, "10");
    await userEvent.type(getLengthInputfield, "50");
    await userEvent.type(getLocationInputfield, "Mandal");

    expect(form).toBeInTheDocument();
    expect(submitbtn).toBeInTheDocument();
    expect(getNameInputfield).toBeInTheDocument();
    expect(getWeightInputfield).toBeInTheDocument();
    expect(getLengthInputfield).toBeInTheDocument();
    expect(getLocationInputfield).toBeInTheDocument();

    expect(form).toBeValid();
  });

  test("requires the input", async () => {
    render(<TestingForm />);

    const getNameInputfield = screen.getByTestId("name");
    const getWeightInputfield = screen.getByTestId("weight");
    const getLengthInputfield = screen.getByTestId("length");
    const getLocationInputfield = screen.getByTestId("location");

    expect(getNameInputfield).toBeRequired();
    expect(getNameInputfield).toBeRequired();
    expect(getWeightInputfield).toBeRequired();
    expect(getLengthInputfield).toBeRequired();
    expect(getLocationInputfield).toBeRequired();
  });

  test("no input with more than 15 letters", async () => {
    render(<TestingForm />);

    const getNameInputfield = screen.getByTestId("name");
    const getLocationInputfield = screen.getByTestId("location");

    await userEvent.type(getNameInputfield, "fbvnvbnvbnvcbncvnvcbncvbnbvn");
    await userEvent.type(getLocationInputfield, "fbvnvbnvbnvcbncvnvcbncvbnbvn");

    expect(getNameInputfield.value).toHaveLength(15);
    expect(getLocationInputfield.value).toHaveLength(15);
  });

  test("tests the submit", async () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <TestingForm onSubmit={onSubmit} />
    );

    const name = "Lachs";
    const weight = "25";
    const length = "10";
    const location = "Mandal";

    fireEvent.change(getByLabelText(/name/i), { target: { value: name } });
    fireEvent.change(getByLabelText(/weight/i), { target: { value: weight } });
    fireEvent.change(getByLabelText(/length/i), { target: { value: length } });
    fireEvent.change(getByLabelText(/location/i), {
      target: { value: location },
    });

    fireEvent.click(getByText(/Submit/i));
    expect(onSubmit).toBeCalled();
  });
});

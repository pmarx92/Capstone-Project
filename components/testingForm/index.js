import React from "react";

function handleSubmit(evt) {
  evt.preventDefault();
  alert(evt.target.elements.message.value);
}

export default function index({ onSubmit = handleSubmit }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <fieldset data-testid="form">
          <label htmlFor="name">Fish Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            minLength="3"
            maxLength="15"
            placeholder="z.B. Lachs"
            pattern=".*[^\s]{1,}.*"
            data-testid="name"
            required
          />
          <label htmlFor="weight">Weight in kg: </label>
          <input
            type="number"
            id="weight"
            name="weight"
            step="0.10"
            min=".50"
            max="25"
            placeholder="z.B. 0.70"
            data-testid="weight"
            required
          />
          <label htmlFor="length">Length in cm: </label>
          <input
            type="number"
            id="length"
            name="length"
            placeholder="z.B. 10"
            step="10"
            min="10"
            max="200"
            data-testid="length"
            required
          />
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            id="location"
            name="location"
            minLength="3"
            maxLength="15"
            placeholder="z.B. Kristiansand"
            pattern=".*[^\s]{1,}.*"
            data-testid="location"
            required
          />
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

import React from "react";

function DeckForm({ handleSubmit, handleChange, deck, linkCancelButton }) {
  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column">
      <div className="d-flex flex-column mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          name="name"
          type="text"
          className="form-control"
          onChange={handleChange}
          value={deck.name}
          placeholder="Deck Name"
          required={true}
        ></input>
      </div>
      <div className="d-flex flex-column mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          className="form-control"
          rows="4"
          onChange={handleChange}
          value={deck.description}
          placeholder="Brief description of the deck"
          required={true}
        ></textarea>
      </div>
      <div className="actions">
        {linkCancelButton}
        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
      </div>
    </form>
  );
}

export default DeckForm;
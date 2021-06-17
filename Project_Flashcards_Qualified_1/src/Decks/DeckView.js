import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index";
import Card from "../Cards/Card";

function DeckView() {
  const [deck, setDeck] = useState({});

  const { deckId } = useParams();

  const history = useHistory();

  // load current deck and set it as deck state using deckId from params
  useEffect(() => {
    const getData = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    };
    getData();
  }, [deckId]);

  // handle deck deletion by triggering dialog box
  // await deleteDeck API call then redirect to home
  const handleDeckDelete = async (id) => {
    const doesConfirm = window.confirm("Are you sure you want to delete?");
    if (!doesConfirm) return;
    await deleteDeck(id);
    history.push("/");
  };

  // helper function to be passed down to Card(s)
  // in order to set deck state "cards" prop array
  // as a filtered array without card to delete
  const onClickCardDelete = async (id) => {
    const newCards = deck.cards.filter((card) => card.id !== Number(id));
    setDeck({
      ...deck,
      cards: newCards,
    });
  };

  let cards;

  // only map out Card components if deck has been loaded
  // and set in the state
  if (deck.id) {
    cards = deck.cards.map((card) => (
      <Card
        key={card.id}
        card={card}
        deck={deck}
        onClickCardDelete={onClickCardDelete}
      />
    ));
  }

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <li className="bi bi-house-door-fill"><span className="oi oi-home"/> Home</li>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <Link to={`/decks/${deckId}/edit`}>
              <button className="btn btn-secondary mr-2"><span className="oi oi-pencil" /> Edit</button>
            </Link>
            <Link to={`/decks/${deckId}/study`}>
              <button className="btn btn-primary mr-2"><span className="oi oi-book" /> Study</button>
            </Link>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button className="btn btn-primary mr-2"><span className="oi oi-plus" /> Add Cards</button>
            </Link>
          </div>
          <div>
            <button
              onClick={() => handleDeckDelete(deckId)}
              className="btn btn-danger"><span className="oi oi-trash"></span>  
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-2">
        <h3 className="mb-3">Cards</h3>
      </div>
      <div>{cards}</div>
    </div>
  );
}

export default DeckView;
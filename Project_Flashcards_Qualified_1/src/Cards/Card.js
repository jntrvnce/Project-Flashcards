import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api/index";

function Card({ card, deck, onClickCardDelete }) {
  const handleDelete = async (id) => {
    // trigger deletion dialog box
    const doesConfirm = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    // return early / exit out of function if Cancel is clicked
    if (!doesConfirm) return;
    // function to await deleteCard API call then use onClickCardDelete prop to delete from state
    const deleteData = async () => {
      await deleteCard(id);
      onClickCardDelete(id);
    };
    // call above function
    deleteData();
  };

  return (
    <div key={card.id} className="card">
        <div className="card-body">
            <div className="container">
                <div className="row">
                    <p className="col-5">
                        {card.front}
                    </p>          
                    <p className="col-5">
                        {card.back}
                    </p>
                    <span className="col-2 justify-content-right">
                      <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                        <button className="btn btn-secondary mr-2"><span className="oi oi-pencil"></span> Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(card.id)}
                        className="btn btn-danger">
                      <span className="oi oi-trash"></span>
                      </button>
                    </span>
                </div>
            </div>    
        </div>  
    </div>
  );
}

export default Card;
import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [inputState, setInputState] = useState({title: '', amount: ''});

  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>

            {/* newAmount is necessary here because React reuses the same event objects within
            a closure!! */}

            <input type="text" id="title" 
              value={inputState.title} 
              onChange={event => {
                const newAmount = event.target.value;
                setInputState(prevInputState => ({
                  title: newAmount, 
                  amount: prevInputState.amount
                }))
            }
            } 
            />
          </div>

          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" 
              value={inputState.amount} 
              onChange={event => {
                  const newTitle = event.target.value;
                    setInputState(prevInputState => ({
                        title: prevInputState.title, 
                        amount: newTitle
                        }))
                        }
                      } 
            />

          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

// both this syntax and arrow functions are valid for functional components

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    setisLoading(true);
    fetch(
      'https://hooks-practice-631f3-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        header: { 'Content-Type': 'application/jsoin' },
      }
    )
      .then((response) => {
        setisLoading(false);
        return response.json().then();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const removeIngredientHandler = (id) => {
    setisLoading(true);
    fetch(
      `https://hooks-practice-631f3-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.json`,
      {
        method: 'DELETE',
      }
    ).then((response) => {
      setisLoading(false);
      setUserIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== id)
      );
    });
  };

  return (
    <div className="App">
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;

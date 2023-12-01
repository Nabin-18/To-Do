import React from 'react'
import "./App.css";
import { useState } from 'react';
import { useEffect } from 'react';

const getLocalData = () => {
  const list = localStorage.getItem("mytodolist");
  if (list) {
    return JSON.parse(list);
  }
  else {
    return [];
  }
};

const App = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());

  const addItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    }
    else {
      const mynewInputData = {
        id: Math.floor(Math.random() * 1000),
        name: inputData,
      };
      setItems([...items, mynewInputData]);
      setInputData("");
    }
    console.log("done");
  }
  //edit items


  const deleteItem = (index) => {
    const updatedItem = items.filter((curElm) => {
      return curElm.id !== index;

    });
    setItems(updatedItem)

  }
  const removeAll = () => {
    setItems([]);
  }
  //adding local stroage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items))
  }, [items]);



  return (
    <div className="container">
      <div className="title">
        <img src="image/title_image.jpg " alt="todologo" />
        <p>Add your List here</p>
      </div>
      <div className="input-box">
        <input type="text" placeholder='Write your todo task' value={inputData} onChange={(e) => setInputData(e.target.value)} />

        <button onClick={addItem}>Add</button>
      </div>
      <div className="todo-items">
        {
          items.map((curElm, index) => {
            return (

              <div className="each-items" key={curElm.id}>
                <h3><span>👉</span>{curElm.name}</h3>
                <div className="edit-delete">
                  {/* <button className='edit-btn' onClick={()=>editItem(curElm.id)}>Edit</button> */}
                  <button className='delete-btn' onClick={() => deleteItem(curElm.id)}>Delete</button>
                </div>
              </div>
            )
          })
        }

      </div>
      <div className="clear-btn">
        <button onClick={removeAll}>Clear</button>
      </div>
    </div>
  )
}

export default App
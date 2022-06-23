import classes from "./Comp.module.css";
import React, { useState } from "react";

function Comp() {
  const [userInput, setUserInput] = useState("");
  const [todoUserInput, settodoUserInput] = useState("");
  const [list, setList] = useState([]);
  const [currList, setCurrList] = useState(null);

  const addList = () => {
    const ListData = {
      index: Date.now(),
      name: userInput,
      tasks: []
    }
    setUserInput("");
    setList([...list, ListData])
    setCurrList(ListData.index)
  }

  const selectedList = (id) => {
    list.find((elem) => {
      return elem.index === id;
    })
    setCurrList(id);
  }

  const addItem = () => {
    const NewItemData = {
      id: Date.now(),
      name: todoUserInput
    }
    settodoUserInput("");
    setList([list.find((elem) => elem.index === currList).tasks.push(NewItemData)])
    setList([...list])
  }

  return (
    <div className={classes.body}>
      <div className={classes.class}>
        <div>
          <ul>
            {list.map((item) => (
              <li key={item.index} className={classes.list} onClick={() => selectedList(item.index)}>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Добавить новый список"
            value={userInput}
            onKeyPress={(e) => e.key === "Enter" && addList()}
          ></input>
          <button onClick={() => addList()}>Сохранить</button>
        </div>
      </div>

      <div className={classes.items}>
        {!list.length ? (
          <div></div>
        ) : (
          <div>
            <input
              type="text"
              onChange={(e) => settodoUserInput(e.target.value)}
              placeholder="Добавить новый пункт"
              value={todoUserInput}
              onKeyPress={(e) => e.key === "Enter" && addItem()}
            />
            <button onClick={() => addItem()}>Сохранить</button>
            <div>
            <ul>
              {list.find((elem) => elem.index === currList).tasks.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comp;

import { useState, useEffect, render } from "./respond";

console.log("refreshed");

const App = () => {
  const [name, setName] = useState("Akash");
  const [todoList, setTodoList] = useState(["Item 1", "Item 2", "Item 3"]);

  const addTodo = (e) => {
    e.preventDefault();

    const newTodo = document.querySelector("#newtodo")!.value;

    console.log("form submitted", newTodo);

    document.querySelector("#newtodo")!.value = "";

    setTodoList([...todoList, newTodo]);
  };

  const submitName = (e) => {
    e.preventDefault();

    const newName = document.querySelector("#newname")!.value;

    console.log("form submitted", newName);

    document.querySelector("#newname")!.value = "";

    setName(newName);
  };

  useEffect(() => {
    const form = document.querySelector("#myform");

    form!.addEventListener("submit", addTodo);

    const nameForm = document.querySelector("#nameform");

    nameForm!.addEventListener("submit", submitName);

    console.log("useeffect running");
  });

  useEffect(() => {
    console.log("runs when name changes");
  }, [name]);

  return `
<h1>Hello Vanilla!</h1>
<div>
  ${todoList
    ?.map((todo, index) => {
      return `<div>Todo ${index + 1}: ${todo}`;
    })
    .join("")}

    <br />
    <br />

    <form id="myform">
    <input id="newtodo" placeholder="Enter a new todo" />
    </form>

    <br />

    ${name}

    <br />
    <br />

    <form id="nameform">
    <input id="newname" placeholder="Enter a new name" />
    </form>
</div>
`;
};

render(App);

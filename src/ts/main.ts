// import { addTodo, changeTodo, removeAllTodos } from "./functions";
import { Todo } from "./models/Todo";
import { IAddResponse } from "./models/IAddResult";

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

document.getElementById("clearTodos")?.addEventListener("click", () => {
  exports.clearTodos(todos);
});

(document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
  "submit",
  (e: SubmitEvent) => {
    e.preventDefault();

    let todoText: string = (
      document.getElementById("newTodoText") as HTMLInputElement
    ).value;
    console.log("Todos when creating", todos);

    exports.createNewTodo(todoText, todos);
  }
);

export function createNewTodo(todoText: string, todos: Todo[]) {
  let result = exports.addTodo(todoText, todos);

  if (result.success) {
    exports.createHtml(todos);
  } else {
    exports.displayError(result.error, true);
  }
}

 export function createHtml(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));

  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li");

    if (todos[i].done) {
      li.classList.add("todo__text--done");
    }

    li.classList.add("todo__text");
    li.innerHTML = todos[i].text;
    li.addEventListener("click", () => {
      exports.toggleTodo(todos[i]);
    });

    todosContainer.appendChild(li);
  }
}

export function toggleTodo(todo: Todo) {
  exports.changeTodo(todo);
  exports.createHtml(todos);
}

export function displayError(error: string, show: boolean) {
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement;

  errorContainer.innerHTML = error;

  if (show) {
    errorContainer.classList.add("show");
  } else {
    errorContainer.classList.remove("show");
  }
}

export function clearTodos(todos: Todo[]) {
  exports.removeAllTodos(todos);
  exports.createHtml(todos);
}

// createHtml(todos);
// För att några av mina tester i main.test.ts skulle fungera kopierade jag in funktioner från functions.ts filen. 
// Testerna i main kunde inte hitta testerna i functions, så jag löste det med att kopiera in de här, 
// så som de var från början när vi fick inlämningsuppgiften.

export function addTodo(todoText: string, todos: Todo[]): IAddResponse {
  if (todoText.length > 2) {
    let newTodo = new Todo(todoText, false);
    todos.push(newTodo);
    return { success: true, error: "Du måste ange minst två bokstäver" };
  } else {
    return { success: false, error: "Du måste ange minst två bokstäver" };
  }
}

export function changeTodo(todo: Todo) {
  todo.done = !todo.done;
}

export function removeAllTodos(todos: Todo[]) {
  todos.splice(0, todos.length);
}

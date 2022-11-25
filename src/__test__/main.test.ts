/**
 * @jest-environment jsdom
 */

import * as functions from "../ts/main";
import { Todo } from "../ts/models/Todo";


describe("createHtml", ()=> {
    test("should create li-tag in ul-tag", ()=> {
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `;
        let todos:Todo[] = [new Todo("Clean", true)];

        functions.createHtml(todos);

        expect(document.getElementById("todos")?.innerHTML).toMatch("</li>");
    })
    test("should add class-name to li-tag", ()=> {
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `;
        let todos:Todo[] = [new Todo("Clean", true)];

        functions.createHtml(todos);

        expect(document.getElementById("todos")?.innerHTML).toMatch("class");
    })

    test("should create li-tag for each todo-object", ()=> {
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `;
        let todos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];

        functions.createHtml(todos);

        expect(document.getElementById("todos")?.innerHTML).toMatch("Clean");
        expect(document.getElementById("todos")?.innerHTML).toMatch("Shower");
    })

    test("should create html", ()=> {
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `;
        let todos:Todo[] = [new Todo("Clean", true)];

        functions.createHtml(todos);

        expect(document.getElementById("todos")?.innerHTML).toMatch("todo__text--done");

    })

    test("should not create html", ()=> {
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `;
        let todos:Todo[] = [new Todo("Shower", false)];

        functions.createHtml(todos);

        expect(document.getElementById("todos")?.innerHTML).toMatch("todo__text");
    })
})

// lägg till att den anropar två funktion med en parameter
describe("toggleTodo", ()=> {
    test("should call function with parameter", ()=> {
        let todos:Todo = new Todo("Clean", true);
        let spy = jest.spyOn(functions,"toggleTodo").mockReturnValue();
    
        functions.toggleTodo(todos);
    
        expect(spy).toBeCalledWith(todos);
    })
})

describe("displayError", ()=> {
    test("should add text to container", ()=> {
        document.body.innerHTML = `
        <div id="error" class="error"></div>
        `;
        let error = "errortext";
        let show = true;

        functions.displayError(error, show);

        expect(document.getElementById("error")?.innerHTML).toBe("errortext");
    })

    test("should ")
})

// lägg till att den anropar två funktion med en parameter
describe("clearTodos", ()=> {
    test("should call function with one parameter", () => {
        let todos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];
        let spy = jest.spyOn(functions, "clearTodos").mockReturnValue();

        functions.clearTodos(todos);

        expect(spy).toBeCalledWith(todos);
    })
})

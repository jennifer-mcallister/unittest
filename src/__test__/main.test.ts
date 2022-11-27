/**
 * @jest-environment jsdom
 */

import * as functions from "../ts/main";
import { IAddResponse } from "../ts/models/IAddResult";
import { Todo } from "../ts/models/Todo";


describe("newTodoForm", ()=> {
    describe("newTodoForm", () => {
        test("should not add text to ul", () => {
            document.body.innerHTML = `
            <form id="newTodoForm">
            <div>
              <input type="text" id="newTodoText" />
              <button>Skapa</button>
              <button type="button" id="clearTodos">Rensa lista</button>
            </div>
            <div id="error" class="error"></div>
          </form>
          <ul id="todos" class="todo"></ul>
            `;
            let todos:Todo[] = [];
            let text: string = "";
      
            functions.createNewTodo(text, todos);
      
            expect(document.getElementById("todos")?.innerHTML).toBe("");
        });

        test("should add text to ul", () => {
            document.body.innerHTML = `
            <form id="newTodoForm">
            <div>
              <input type="text" id="newTodoText" />
              <button>Skapa</button>
              <button type="button" id="clearTodos">Rensa lista</button>
            </div>
            <div id="error" class="error"></div>
          </form>
          <ul id="todos" class="todo"></ul>
            `;
            let todos:Todo[] = [];
            let text: string = "hello world";
      
            functions.createNewTodo(text, todos);
      
            expect(document.getElementById("todos")?.innerHTML).toMatch("hello world");
        });
    })
})

describe("createNewTodo", ()=> {

    test("should call one function", ()=> {
        let spyA = jest.spyOn(functions, "createHtml").mockReturnValue();
        let spyB = jest.spyOn(functions, "displayError").mockReturnValue();
        let todos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];
        let text :string = "hello world";

        functions.createNewTodo(text, todos);

        expect(spyA).toHaveBeenCalledTimes(1);
        expect(spyB).toHaveBeenCalledTimes(0);

    })

    test("should call the other function", ()=> {
        let spyA = jest.spyOn(functions, "createHtml").mockReturnValue();
        let spyB = jest.spyOn(functions, "displayError").mockReturnValue();
        let spyC = jest.spyOn(functions, "addTodo").mockReturnValue({success:true, error:"text"});
        let todos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];
        let text :string = "he";

        functions.createNewTodo(text, todos);

        expect(spyA).toHaveBeenCalledTimes(0);
        expect(spyB).toHaveBeenCalledTimes(1);

    })
    // test("should call errorfunction one time when characters is less then 3", ()=> {
    //     document.body.innerHTML = `
    //     <ul id="todos" class="todo"></ul>`;
        
    //     let todoText :string = "te";
    //     let todos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];
    //     let spy = jest.spyOn(functions, "displayError").mockImplementation(()=>{});
        
    //     functions.createNewTodo(todoText, todos);

    //     expect(spy).toHaveBeenCalledTimes(1);
    //     spy.mockClear();
    // })

    // test("should call createHtmlfunction one time when characters is more then 2", ()=> {
    //     document.body.innerHTML = `
    //     <ul id="todos" class="todo"></ul>`;
        
    //     let todoText :string = "testtext";
    //     let todos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];
    //     let spy = jest.spyOn(functions, "createHtml").mockImplementation(()=>{});
        
    //     functions.createNewTodo(todoText, todos);

    //     expect(spy).toHaveBeenCalledTimes(1);
    // })

    // test("should do a if true", ()=> {
    //     document.body.innerHTML = `
    //     //     <ul id="todos" class="todo"></ul>`;
    //     let todoText :string = "testtext";
    //     let todos:Todo[] = [];
    //     let success :boolean = true;
    //     let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
       
        
    //     functions.createNewTodo(todoText, todos);

    //     expect(spy).toHaveBeenCalled();
    //     expect(success).toBe(true);
       
    // })
    //
    test("should call createHtml", ()=> {
       
        let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
        let todoText: string = "testtext";
        let todos: Todo[] = [new Todo("clean", false)];

        functions.createNewTodo(todoText, todos);

        expect(spy).toBeCalled();
    })
})
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

    test("should change html  in ul", ()=> {
        document.body.innerHTML = `
        <ul id="todos" class="todo">hello world</ul>
        `;
        let todos:Todo[] = [];

        functions.createHtml(todos);

        // expect(todos[0].done).toBe(true);
        
        expect(document.getElementById("todos")?.innerHTML).not.toBe("hello world");

        // expect(document.getElementById("todos")?.innerHTML).toMatch('Clean');

    })

    test("should remove text in ul", ()=> {
        document.body.innerHTML = `
        <ul id="todos" class="todo">hello world</ul>
        `;
        let todos:Todo[] = [];

        functions.createHtml(todos);

        expect(document.getElementById("todos")?.innerHTML).toMatch("");
    })
})

// lägg till att den anropar två funktion med en parameter
describe("toggleTodo", ()=> {
    test("should call function with one parameter", ()=> {
        let todos:Todo = new Todo("Clean", true);
        let spy = jest.spyOn(functions,"toggleTodo").mockReturnValue();
    
        functions.toggleTodo(todos);
    
        expect(spy).toBeCalledWith(todos);
    })
    
   
    test("should call first function with one parameter", ()=> {
        let todo:Todo = new Todo("Clean", true);
        let spy = jest.spyOn(functions,"changeTodo").mockReturnValue();
    
        functions.changeTodo(todo);
    
        expect(spy).toBeCalledWith(todo);
        expect(spy).toBeCalledTimes(1);
    })

     // blir inte anropade..?
    // test("should call second function with one parameter", ()=> {
    //     let todo:Todo = new Todo("Clean", true);
    //     let todos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];
    //     let spy = jest.spyOn(functions,"createHtml").mockImplementation();
    
    //     functions.changeTodo(todo);
    
    //     // expect(spy).toBeCalledWith(todos);
    //     expect(spy).toBeCalledTimes(1);
    // })

})

describe("displayError", ()=> {
    test("should add text to container", ()=> {
        document.body.innerHTML = `
        <div id="error" class="error"></div>
        `;
        let error :string = "errortext";
        let show :boolean= true;

        functions.displayError(error, show);

        expect(document.getElementById("error")?.innerHTML).toBe("errortext");
    })

    test("should add class", ()=> {
        document.body.innerHTML = `
        <form id="newTodoForm">
        <div id="error" class="error"></div>
        </form>
        `;
        let error :string = "errortext";
        let show :boolean = true;

        functions.displayError(error, show);

        expect(document.getElementById("newTodoForm")?.innerHTML).toMatch("show");
    })

    test("should remove class", ()=> {
        document.body.innerHTML = `
        <form id="newTodoForm">
        <div id="error" class="error"></div>
        </form>
        `;
        let error :string = "errortext";
        let show: boolean = false;

        functions.displayError(error, show);

        expect(document.getElementById("newTodoForm")?.innerHTML).not.toMatch("show");
    })
})

// lägg till att den anropar två funktion med en parameter
describe("clearTodos", ()=> {
    test("should call function with one parameter", () => {
        let todos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];
        let spy = jest.spyOn(functions, "clearTodos").mockReturnValue();

        functions.clearTodos(todos);

        expect(spy).toBeCalledWith(todos);
    })

    test("should call function with one parameter", () => {
        let todos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];
        let spy = jest.spyOn(functions, "createHtml").mockReturnValue();

        functions.createHtml(todos);

        expect(spy).toBeCalledWith(todos);
    })
})


// functions tester

/**
 * @jest-environment jsdom
 */
 
 

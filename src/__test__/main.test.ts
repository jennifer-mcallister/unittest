import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";


// functions in functions.ts

describe("addTodo", ()=> {
    test("should not create therefor not add new todo object if string is less then 3 characters", ()=> {
        let myTodos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];
        let length:number = myTodos.length;
        let todoText:string = "ab";

        addTodo(todoText, myTodos); 

        expect(myTodos.length).toBe(length);
    })

    test("should create new todo object if string i higher then 2 charachters", ()=> {
        let myTodos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];
        let length:number = myTodos.length;
        let todoText:string = "Clean";

        addTodo(todoText, myTodos);

        expect(myTodos.length).toBe(length + 1);
    })

})

describe("changeTodo", ()=> {
    test("should change boolean from false to true", ()=> {
        let myTodo:Todo = new Todo("Clean", false);
    
        changeTodo(myTodo);

        expect(myTodo.done).toBe(true);
    })

    test("should change boolean from true to false", ()=> {
        let myTodo:Todo = new Todo("Clean", true);

        changeTodo(myTodo);

        expect(myTodo.done).toBe(false);
    })
})

describe("clearTodos", ()=> {

    test("should remove all objects in list", ()=> {
        let myTodos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];

        removeAllTodos(myTodos);

        expect(myTodos.length).toBe(0);
    })
})


// functions in main.ts

// describe("createNewTodo", ()=> {
//     test("should call createHTML function with todo list if success is true", ()=> {
//         let myTodos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];
//         let result
        
//         const mockCreateHtml = jest.fn();


//         expect(mockCreateHtml).toHaveBeenCalledWith(myTodos);
//     })
// })

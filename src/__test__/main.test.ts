import { removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

describe("clearTodos", ()=> {
    test("should clear todo-list", ()=> {
        
        let myTodos:Todo[] = [new Todo("Clean", true), new Todo("Shower", false)];

        removeAllTodos(myTodos);
        expect(myTodos.length).toBe(0);
    })
})
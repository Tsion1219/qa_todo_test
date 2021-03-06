import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
  } from "selenium-webdriver"; 
import { toEditorSettings } from "typescript";
 const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
.withCapabilities(Capabilities.chrome())
.build();

 class TodoPage {
    driver: WebDriver;
    url: string = "https://devmountain.github.io/qa_todos/";
    todoCount: By = By.className("todo-count");
  //clearCompletedButton: By = By.css("button.clear-completed");
    // this is the class object
   
    todoInput:By =(By.css("input.new-todo"));
    todoStar: By = By.className("star");
    // this locator will find ALL the todos
    todos: By = (By.css("li.todo"));
    // this locator will find the text of a todo FROM the todo
    todoLabel: By = (By.css("label"));
    // this locator will find the checkbox for the todo FROM the todo
    todoComplete: By = By.css("input");
    // star banner
    starBanner: By = By.className("starred");
    // this locator is for the "Clear complete" button in the corner
    clearCompletedButton: By = By.css("button.clear-completed");
            //i  create the constractor to assign unassign property 
            //the class constractor
        constructor(driver:WebDriver){
            this.driver = driver;

        }
        // this  the function
        async navigate() {
            await this.driver.get(this.url);
            await driver.wait(until.elementLocated(this.todoInput));

          }
          async addTodo() {
            await driver.findElement(this.todoInput).sendKeys("write poem\n");
          }

          async getAddedElement(){
            let myTodos = await driver.findElements(this.todos);
            return await myTodos.filter(async(todo) =>{
              (await (await todo.findElement(this.todoLabel)).getText()) == "write poem";  
      
            });
          }
}
// create new object of the abave class
const toDoPage = new TodoPage(driver);

describe("the todo app", () => {
    jest.setTimeout(15000);
    beforeEach(async () => {
        await toDoPage.navigate();
      });
      afterAll(async () => {
        //await driver.quit();
      });
      
      //this function can add 
  it("can add a todo", async () => {
   await toDoPage.addTodo();
   const myTodo = await toDoPage.getAddedElement();
    expect(myTodo.length).toEqual(1);
  });
// the function can remove
  it("can remove a todo", async() => {
    let myTodos = await driver.findElements(toDoPage.todos);
     await myTodos.filter,async() => {
        await (await driver.findElement(toDoPage.todoLabel)).getText()=="write a code"
     };
     //[0].findElement(toDoPage.todoComplete).click();
     const myTodo = await toDoPage.getAddedElement();
    (await myTodo[1].findElement(toDoPage.todoComplete)).click();
     const removedTodo =  await toDoPage.getAddedElement;
      expect(removedTodo.length).toEqual(0)

  });
   it("can mark a todo with a star", async() => {
      let startingStars = await (await driver.findElements(toDoPage.starBanner)).length;
      await toDoPage.addTodo();
      (await startingStars[0].findElement(toDoPage.starBanner)).click();
       toDoPage.getAddedElement()[0].findElement(toDoPage.starBanner).click();
      
    let endingStars = await (await driver.findElements(toDoPage.starBanner)).length;
    expect(endingStars).toBeGreaterThan(startingStars);
  });
      

  });
  it("has the right number of todos listed",async () => {
    await driver.wait(until.elementLocated(toDoPage.todoInput));

    let startingTodoCount = await (await driver.findElements(toDoPage.todos)).length;

    // adding 5 todos here
    await driver.findElement(toDoPage.todoInput).sendKeys("werite acode 1\n");
    await driver.findElement(toDoPage.todoInput).sendKeys("write acode 2\n");
    await driver.findElement(toDoPage.todoInput).sendKeys("write acode 3\n");
    await driver.findElement(toDoPage.todoInput).sendKeys("write acode 4\n");
    await driver.findElement(toDoPage.todoInput).sendKeys("write acode 5\n");

    let endingTodoCount = await (await driver.findElements(toDoPage.todos)).length;

    let message = await (await driver.findElement(toDoPage.todoCount)).getText();

    expect(endingTodoCount - startingTodoCount).toBe(5);
    expect(message).toBe(`${endingTodoCount} items left`);
  });


  


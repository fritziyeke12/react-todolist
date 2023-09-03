import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    if([todos].length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);
  
  // Add the handlesubmit code here
  function handleSubmit(e){
    //stops the default action resulting from a submit being triggered
    e.preventDefault();

    //creates a new task/todo
    const newTodo = {
      //gives the todo an id of the time of creation
      id: new Date().getTime(),
      //the desc is the text submitted from the form (white space trimmed)
      text: todo.trim(),
      //set to false when created by default to show the task is not yet done
      complete: false
    }

    //checks if the todo's text is empty after the trim, this mean blank todos won't be added
    if (newTodo.text.length > 0){
      //creates a copy of the array "todos" and concatenates the newTodo onto the end of it
      //setTodos then updates the state of the "todos" array to include the new todo, triggering a re-render of the component
      setTodos([...todos].concat(newTodo));
      //sets the value of todo to an empty str to clear the previous user input
      setTodo("");
    }
    else{
      //Sends a pop up telling the user to enter a valid todo (characters instead of whitespace)
      alert("Enter Valid Todo!");
      setTodo("");
    }
  }
  
  // Add the deleteToDo code here
  function deleteTodo(id){

    //creates a new array filtering out the todo with the id passed into the function
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);

    //updates the state of the todo array, re-rendering the component
    setTodos(updatedTodos);
  }

  
  // Add the toggleComplete code here
function toggleComplete(id){
  //makes a copy of the current array of todos and maps through the elements
  let updatedTodos = [...todos].map((todo) => {
    //checks to see if the current element matchs the id passed in
    if (todo.id === id){
      //the matching todo has its "complete" prop changed to the opposite value either true or false
      todo.complete = !todo.complete
    }

    return todo;
  });

  //updates the todo list re-rendering
  setTodos(updatedTodos);
}
  
  // Add the submitEdits code here
function submitEdits(id){
  const updatedTodos = [...todos].map((todo) => {
    if(todo.id === id){
      todo.text = editingText;
    }

    return todo;
  })

  setTodos(updatedTodos);
  setTodoEditing(null);
}
  
return(
<div id ="todo-list">
  <h1>Todo List</h1>
  <form onSubmit={handleSubmit}>
    <input
    type ="text"
    onChange={(e) => setTodo(e.target.value)}
    placeholder="Add new Todo"
    value={todo}
    />
    <button type ="submit">Add Todo</button>
  </form>
  {todos.map((todo) => 
  <div key={todo.id} className="todo">
    <div className="todo-item">
      <input
        type="checkbox"
        id="completed"
        checked={todo.complete}
        onChange={() => toggleComplete(todo.id)}
      />
      {todo.id === todoEditing ? (
        <input
          type="text"
          onChange={(e) => setEditingText(e.target.value)}
        />
      ) : (
        <div style={todo.complete ? {"text-decoration": "line-through"} : {}}>{todo.text}</div>
      )}
    </div>
    <div className="todo-actions">
    {todo.id === todoEditing ? (
      <button onClick={() => submitEdits(todo.id)}>Submit Edit</button>
    ) : (
      <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
    )}
    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
  </div>
</div>
  )}
  
</div>
);
};
export default App;

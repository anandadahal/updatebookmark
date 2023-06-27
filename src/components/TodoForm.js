import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { databases } from "../appwrite/appwriteConfig";

function TodoForm() {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise = databases.createDocument(
      "64996799eb3a0c0a2089",
      "649967a0055f70f24542",
      uuidv4(),
      {
        todo,
      }
    );
    console.log(promise);
    promise.then(
      function (response) {
        console.log(response);
        window.location.reload(); // to handle for the different way
      },
      function (error) {
        console.log(error);
      }
    );
    e.target.reset();
  };
  return (
    <>
      <div className="max-w-7xl mx-auto mt-10">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex justify-center mb-10"
        >
          <input
            id="input"
            name="input"
            type="url"
            placeholder="Eg:https://www.facebook.com"
            className="border p-2 w-2/3 rounded-md  text-white"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-blue-500 p-2 text-white ml-2 rounded-md"
          >
            ADD BOOKMARK
          </button>
        </form>
      </div>-
    </>
  );
}

export default TodoForm;

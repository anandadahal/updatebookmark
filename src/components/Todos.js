// import React, { useEffect, useState,useHistory } from "react";
// import { databases } from "../appwrite/appwriteConfig";
// import Thapa from './Thapa'
// function Todos() {
//   const [todos, setTodos] = useState();
//   const [loader, setLoader] = useState(false);
//   // const history = useHistory();

//   useEffect(() => {
//     setLoader(true);
//     const getTodos = databases.listDocuments(
//       "64801c50653e27753cf8",
//       "64801c594d7d8845115a"
//     );

//     getTodos.then(
//       function (response) {
//         setTodos(response.documents);
//       },
//       function (error) {
//         console.log(error);
//       }
//     );
//     setLoader(false);
//   }, []);

//   const deleteTodo = (id) => {
//     const promise = databases.deleteDocument(
//       "64801c50653e27753cf8",
//       "64801c594d7d8845115a",
//       id
//     );
//     promise.then(
//       function (response) {
//         console.log(response);
//       },
//       function (error) {
//         console.log(error);
//       }
//     );
//     window.location.reload();
//   };
//   //update doc
//   // const handleUpdate=(e ,item )=>{
//   //   e.preventDefault();
//   //   console.log(item);
//   //   history.push({
//   //     pathname:"/Update",
//   //     state:item,
//   //   })
//   // }

//   return (
//     <>
//       <div className="max-w-7xl mx-auto">
//         <p className="text-xl font-bold mb-2">Bookmark</p>
//         {loader ? (
//           <p>...loading</p>
//         ) : (
//           <div>
//             {todos &&
//               todos.map((item) => (
//                 <div key={item.$id}>
//                   <div className="p-4 flex items-center justify-between shadow-md">
//                     <div>
//                       <a href={`${item.todo}`}>
//                         {item.todo}
//                       </a>
//                     </div>
//                     <div className="delete">
//                     <span 
//                       onClick={() => {
//                         deleteTodo(item.$id);
//                       }}
//                       className="text-red-400 cursor-pointer "
//                     >
//                       Delete
//                     </span>
//                     <span
//                       // onClick={(e) => 
//                       //   handleUpdate(e, item)
//                       // }
//                       className="text-red-400 cursor-pointer"
//                     >
//                       <Thapa/>
//                     </span>
//                     {/* <Update/> */}
//                     </div>
                    
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Todos;


import React, { useState, useEffect } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { Trash, Trash2, Edit, Trash2Icon } from "lucide-react";

function TodosForm() {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [editedTodoId, setEditedTodoId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLoader(true);
    const getTodos = async () => {
      try {
        const response = await databases.listDocuments(
          "64996799eb3a0c0a2089",
      "649967a0055f70f24542"// Replace with your collection ID
        );
        setTodos(response.documents);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      setDeletedItemId(id);
      await databases.deleteDocument(
       "64996799eb3a0c0a2089",
      "649967a0055f70f24542", // Replace with your collection ID
        id
      );
      setTodos(todos.filter((todo) => todo.$id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = (id) => {
    setEditedTodoId(id);
    const todoToEdit = todos.find((todo) => todo.$id === id);
    setEditedContent(todoToEdit.todo);
    setIsEditing(true);
  };

  const updateTodo = async (id) => {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo.$id === id) {
          return { ...todo, todo: editedContent };
        }
        return todo;
      });

      const updatedTodo = updatedTodos.find((todo) => todo.$id === id);
      const remainingTodos = updatedTodos.filter((todo) => todo.$id !== id);
      const updatedTodoList = [updatedTodo, ...remainingTodos];

      setTodos(updatedTodoList);
      setEditedTodoId(null);
      setEditedContent("");
      setIsEditing(false);

      await databases.updateDocument(
        "64996799eb3a0c0a2089",
      "649967a0055f70f24542",// Replace with your collection ID
        id,
        { todo: editedContent }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="max-w-5xl flex flex-col mx-auto">
      <h1 className="self-center  text-2xl font-bold mb-4  text-white  ">
        BOOKMARKS
      </h1>
      {loader ? (
        <div className="grid place-items-center w-full h-screen">
          
          <span className="loader" />
        </div>
      ) : (
        <section>
          {todos &&
            todos.map((item) => (
              <div key={item.$id}>
                <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                  <div className="w-4/5 ">
                    {item.$id === editedTodoId && isEditing ? (
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="border rounded-lg self-center px-4 py-0.5 focus:outline-none box-border w-full resize-none "
                        name="editedContent"
                        wrap="soft"
                        autoCorrect="on"
                      />
                    ) : (
                    
                      <a href={`${item.todo}`}>
                         {item.todo}
                                  </a>
                    )}
                  </div>
                  <div className="flex space-x-6">
                    {item.$id === editedTodoId && isEditing ? (
                      <button
                        onClick={() => updateTodo(item.$id)}
                        className="text-semibold text-white bg-green-500 px-2 py-1 rounded-lg cursor-pointer ring-1 ring-offset-0 ring-green-500 active:ring-offset-2"
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <span className=" border-2 border-gray-300 border-dashed"></span>
                        <span>
                          <Edit
                            className="text-blue-600 cursor-pointer"
                            onClick={() => editTodo(item.$id)}
                          />
                        </span>
                      </>
                    )}
                    <span className="border-2 border-gray-300 border-dashed"></span>
                    <span>
                      {item.$id === deletedItemId ? (
                        <Trash2 className="text-red-500 cursor-pointer" />
                      ) : (
                        <Trash
                          className="text-red-500 cursor-pointer"
                          onClick={() => deleteTodo(item.$id)}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </section>
      )}
    </main>
  );
}

export default TodosForm;

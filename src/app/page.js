"use client";

import Todo from "@/components/Todo";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function Home() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  const [allTodos, setAllTodos] = useState([]);

  const setTitle = (e) =>
    setTodo({
      ...todo,
      ["title"]: e.target.value,
    });
  const setDescription = (e) =>
    setTodo({
      ...todo,
      ["description"]: e.target.value,
    });

  const reset = (e) =>
    setTodo({
      title: "",
      description: "",
    });

    const fetchTodos = async () => {
      try {
        const response = await axios.get(`/api`);
        setAllTodos(response.data.Todos)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    useEffect(() => {
      fetchTodos();
    });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api`, todo);
      toast.success(response.data.msg);
      reset();
      await fetchTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`/api`,{
        params:{
            id:id
        }
      });
      toast.success(response.data.msg);
      await fetchTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateTodo = async (id) => {
    try {
      const response = await axios.put(`/api`,{},{
        params:{
            id:id
        }
      });
      toast.success(response.data.msg);
      await fetchTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  return (
    <>
      <section className="w-full md:w-[70%] py-24 px-2 mx-auto">
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <input
              type="text"
              value={todo.title}
              onChange={setTitle}
              className="w-full px-3 
             py-2 h-10 outline-none 
             border border-purple-500"
              placeholder="Enter Title"
            />
          </div>
          <div className="mb-3">
            <textarea
              value={todo.description}
              onChange={setDescription}
              className="w-full px-3 
             py-2 outline-none 
             border border-purple-500"
              placeholder="Enter Description"
              rows={5}
              cols={5}
            ></textarea>
          </div>
          <div className="mb-3">
            <Button>Add Todo</Button>
          </div>
        </form>
        <div className="py-10">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                allTodos.length>0 && allTodos.map((c,i)=>{
                  return <Todo  key={i} id={i} complete={c.isCompleted} 
                  description={c.description} title={c.title} 
                  mongoId={c._id} deleteFunction={deleteTodo}
                  updateTodo={updateTodo}/>
                  })
                }
                
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

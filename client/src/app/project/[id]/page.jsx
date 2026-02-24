"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { id } = useParams(); 
  const [project, setProject] = useState();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  
  useEffect(() => {
    if(!id) return;
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:5000/project/${id}`,{
          credentials:"include"
        });
        if (!res.ok) return;
        const data = await res.json();
        setProject(data);
        setTasks(data.tasks ?? []);
        } 
        catch (err) {
        console.error(err);
      }
    };
  fetchProject();
  }, [id]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const title = newTask.trim();
    if (!title) return;

    try {
      const res = await fetch(
        `http://localhost:5000/taskCreate/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials:"include",
          body: JSON.stringify({ title, completed: false }),
        }
      );

      if (!res.ok) throw new Error("Task creation failed");

      const createdTask = await res.json();
      setTasks((t) => [...t, createdTask]); 
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };

   const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/taskDel/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      setTasks((t) => t.filter((task) => task._id !== taskId));
    } catch {
      alert("Delete failed");
    }
  };
   const toggleDone = async (taskId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/${taskId}/done`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const updated = await res.json();

      setTasks((t) =>
        t.map((task) => (task._id === taskId ? updated : task))
      );
    } catch {
      alert("Update failed");
    }
  };

  if(!project) return <p className="p-6">Project Not Found</p>
 

  return (
     <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold">{project.name}</h1>

      <p className="mb-6 text-gray-700">
        {project.description || "No description"}
      </p>

      <h2 className="text-2xl font-semibold mb-3">Tasks</h2>

      
      <div className="mb-6 space-y-2">
        {tasks.length === 0 && (
          <p className="text-gray-500">No tasks yet</p>
        )}

        {tasks.map(({ _id, title, completed }) => (
          <div
            key={_id}
            className="bg-white p-3 rounded-lg flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleDone(_id)}
              />

              <span
                className={
                  completed ? "line-through text-gray-400" : ""
                }
              >
                {title}
              </span>
            </div>

            <button
              onClick={() => deleteTask(_id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      
      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded-lg"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
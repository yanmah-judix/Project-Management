"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { id } = useParams(); 
  const [project, setProject] = useState();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // fetch project
  useEffect(() => {
    if(!id) return;
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:5000/project/${id}`,{
          credentials:"include"
        });
        if (!res.ok) console.log("error occured");

        const data = await res.json();
        setProject(data);
        setTasks(data.tasks ?? []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProject();
  }, [id]);

  // add task
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
      setTasks((t) => [...t, createdTask]); // instant update
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };
 if(project===undefined) return null;
  if (!project) return <p className="p-6">Project not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <p className="mb-6 text-gray-700">
        {project.description || "No description"}
      </p>

      <h2 className="text-2xl font-semibold mb-3">Tasks</h2>

      <div className="mb-6 space-y-2">
        {tasks.map(({ _id, title, completed }) => (
          <p key={_id} className="bg-white p-2 rounded-lg">
            {title} {completed && "(Done)"}
          </p>
        ))}
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          className="flex p-2 border rounded-lg"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add Task
        </button>
      </form>
    </div>
  );
}
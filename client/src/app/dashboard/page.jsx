import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


async function getProjects() {
  const cookie = (await headers()).get("cookie") || "";

  const res = await fetch("http://localhost:5000/project", {
    headers: { cookie },
    cache: "no-store",
  });
   if (res.status === 401) {
    redirect("/login");
  }

  if (!res.ok) return [];
  return res.json();
}

export default async function DashboardPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {projects.length === 0 ? (
        <p className="mb-6">No projects found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-gray-600 mt-2">
                {p.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Button always at bottom */}
      <Link href="/projects/new">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Create Project
        </button>
      </Link>

    </div>
  );
}

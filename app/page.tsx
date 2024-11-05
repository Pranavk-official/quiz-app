import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Quiz Platform</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Link href="/instructor">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-2xl font-semibold mb-4">Instructor Portal</h2>
              <p className="text-gray-600">
                Create and manage quizzes for your students
              </p>
            </div>
          </Link>
          <Link href="/student">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-2xl font-semibold mb-4">Student Portal</h2>
              <p className="text-gray-600">
                Take quizzes and view your results
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

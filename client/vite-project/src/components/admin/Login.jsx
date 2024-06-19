import Header from "./Header";

function Login() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-14">
        <form className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <div className="relative mb-4">
            <span>Username</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            </div>
          </div>
          <div className="relative mb-4">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500 transition duration-300"
          >
            Submit
          </button>
          <p className="mt-4 text-center">
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

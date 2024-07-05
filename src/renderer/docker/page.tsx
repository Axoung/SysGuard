import { useNavigate } from 'react-router-dom';

export default function DockerPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is a new page</h1>
      <p>Welcome to the new page!</p>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
        // className="relative text-white  bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-700 font-sans overflow-y-hidden flex justify-center items-center"
      >
        <span role="img" aria-label="folded hands">
          🙏
        </span>
        返回主页
      </button>
    </div>
  );
}

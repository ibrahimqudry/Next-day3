
import { useRouter } from "next/navigation";


const UserCard = ({ user }) => {
  const router = useRouter(); 
  return (
    <li className="p-6 border rounded-lg bg-white shadow-md flex flex-col items-center h-[250px] justify-between">
    <h2 className="text-xl text-black font-semibold">{user.name}</h2>
    <h2 className="text-lg text-gray-600">{user.email}</h2>
    <h2 className="text-lg text-gray-600">{user.phone}</h2>
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => router.push(`/users/${user._id}`)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        View Profile
      </button>
      <button
        onClick={() => router.push(`/users/edituser/${user._id}`)}
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
      >
        Edit User
      </button>
    </div>
  </li>
  );
};

export default UserCard;

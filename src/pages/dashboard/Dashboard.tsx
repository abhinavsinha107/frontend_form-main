import { useAppDispatch, useAppSelector } from "../../store/store";
import { removeUser, selectAuth } from "../../store/reducers/authSlice";

const Dashboard = () => {
  const { name } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(removeUser());
  };

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <h4>Name: {name}</h4>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

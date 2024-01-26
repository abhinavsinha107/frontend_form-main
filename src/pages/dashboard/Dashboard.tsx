import { useAppDispatch, useAppSelector } from "../../store/store";
import { removeUser, selectAuth } from "../../store/reducers/authSlice";
import { useLazyLogoutUserQuery } from "../../services/authApi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { name } = useAppSelector(selectAuth);

  const [logoutUser, {data, isSuccess, isError, error}] = useLazyLogoutUserQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(removeUser());
    navigate("/login");
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

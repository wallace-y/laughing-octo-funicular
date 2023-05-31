import { useContext } from "react";
import { UserContext } from "../contexts/User";

const CurrentUser = () => {
  const { user } = useContext(UserContext);

  return <p className="text-light my-0">You're logged in as: {user}</p>;
};

export default CurrentUser;

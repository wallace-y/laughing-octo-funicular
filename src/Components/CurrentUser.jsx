import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { getUser } from "../utils";

const CurrentUser = () => {
  const { user } = useContext(UserContext);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getUser(user).then((res) => {
      setAvatar(res.avatar_url);
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  return (
    <p className="text-light my-auto">
      You're logged in as: {user}{" "}
      <img
      className="img-thumbnail shadow"
        src={`${avatar}`}
        alt="user avatar logo"
        style={{ clipPath: "circle()", width: "50px" }}
      ></img>
    </p>
  );
};

export default CurrentUser;

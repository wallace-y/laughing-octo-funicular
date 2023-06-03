import loadingImage from "../assets/tic-tac-toe.gif";

const Loading = () => {
  return (
    <main className="text-center mt-5">
      <img
        style={{ width: "200px" }}
        src={loadingImage}
        alt="tic-tac-toe loading image"
      ></img>
    </main>
  );
};

export default Loading;

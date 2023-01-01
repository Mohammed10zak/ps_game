import "./style.css";
export default function LastPlayed(props) {
  return (
    <div className="play">
      <img src={props.gameImg} alt="gameImg" className="gameImg" />
      <p className="palyInfo">{props.palyInfo}</p>
    </div>
  );
}

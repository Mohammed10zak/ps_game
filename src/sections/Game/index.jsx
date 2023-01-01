import "./style.css";
export default function Game(props) {
  return (
    <>
      <div className="game_card">
        <div>
          <img
            src={props.cardBg}
            alt="game_card_background"
            className="game_card_background"
          />
        </div>

        <div className="overlay_content">
        <p className={`desc_game ${props.direction}`}>{props.desc}</p>

        </div>
      </div>
    </>
  );
}

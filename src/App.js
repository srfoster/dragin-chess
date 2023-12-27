import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useDraginOutgoing, useDraginIncoming } from "dragin-lib";
import { Chess } from "chess.js"

function App() {
  const [game, setGame] = useState(new Chess());

  useDraginOutgoing(
    {game: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},
    { game: game.fen() },
    [game.fen()])

  useDraginIncoming((card) => {
    console.log("Incoming", card.data.appData.game)
    const gameCopy = new Chess()
    gameCopy.load(card.data.appData.game)
    setGame(gameCopy)
  })

  function makeAMove(move) {
    const gameCopy = new Chess()
    gameCopy.load(game.fen())

    let result
    try {
      result = gameCopy.move(move.from + "-" + move.to);
    } catch (e) {
      return
    }

    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare, targetSquare) {
    console.log(sourceSquare, targetSquare)
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    return true;
  }

  return (
    <div>
      <Chessboard
        position={game.fen()}
        onPieceDrop={ onDrop}
        id="BasicBoard" />
    </div>
  );
}

export default App;

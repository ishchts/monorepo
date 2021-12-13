import React from 'react';

type SquareProps = {
  value: string | null,
  onClick: () => void
}

function calculateWinner(squares: BoardProps['squares']) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square = (props: SquareProps) => {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

type BoardProps = {
  squares: (string | null)[],
  onClick: (index: number) => void
}

class Board extends React.Component<BoardProps, unknown> {
  renderSquare(index: number) {
    return (
      <Square
        value={this.props.squares[index]}
        onClick={() => this.props.onClick(index)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

type GameState = {
  history: {
    squares: (string | null)[]
  }[],
  isNext: boolean,
  stepNumber: number,
}

class Game extends React.Component<unknown, GameState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      isNext: true,
      stepNumber: 0,
    }
  }

  handleClick = (index: number): void => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    squares[index] = this.state.isNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      isNext: !this.state.isNext,
    })
  }

  jumpTo = (step: GameState['stepNumber']) => {
    this.setState({
      stepNumber: step,
      isNext: step % 2 === 0
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move
        ? `Перейти к ходу # ${move}`
        : `К началу игры`;

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status:string
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next: ${this.state.isNext ? 'X' : 'O' }`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game
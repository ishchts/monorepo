import React, { Suspense } from 'react';
import {ThemeProvider} from "./hooks/theme-context";

import { ThemedButton } from './components/themed-button'
import ErrorBoundary from './components/error-boundary'

class BuggyCounter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({counter}: any) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

const FancyButton = React.forwardRef<HTMLButtonElement, React.HTMLProps<HTMLButtonElement>>((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

FancyButton.displayName = 'FancyButton'

function App() {
  const ref = React.createRef<HTMLButtonElement>();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Загрузка...</div>} >
        <ThemeProvider>
          <div className="App">
            <div>appaaa</div>
            <ThemedButton />
            <BuggyCounter />
            <FancyButton ref={ref}>Click me!</FancyButton>
          </div>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

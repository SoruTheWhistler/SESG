import { useEffect, useState } from 'react';
import { generateExponentialValues } from './utils/generateExponentialValues.js';
import { randomBetween } from './utils/randomBetween.js';
import './Home.css';

const App = () => {
  const [startValue, setStartValue] = useState(159);
  const [endValue, setEndValue] = useState(21500);
  const [iterations, setIterations] = useState(10);
  const [roundTen, setRoundTen] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(generateExponentialValues(startValue, endValue, iterations, roundTen));
  }, []);

  useEffect(() => {
    if (autoUpdate) {
      if (
        typeof startValue === 'number' &&
        typeof endValue === 'number' &&
        typeof iterations === 'number' &&
        typeof roundTen === 'boolean'
      ) {
        if (
          startValue >= 1 &&
          endValue >= 1 &&
          endValue >= startValue &&
          iterations >= 2
        ) {
          setValues(generateExponentialValues(startValue, endValue, iterations, roundTen));
        }
      }
    };
  }, [startValue, endValue, iterations, roundTen, autoUpdate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setStartValue(parseInt(e.target.start.value));
    setEndValue(parseInt(e.target.end.value));
    setIterations(parseInt(e.target.iterations.value));
    setRoundTen(e.target.roundTen.checked);

    setValues(generateExponentialValues(startValue, endValue, iterations, roundTen));
  }

  const randomizeValues = (e) => {
    e.preventDefault();
    setStartValue(randomBetween(10, 200));
    setEndValue(randomBetween(10000, 50000));

    setValues(generateExponentialValues(startValue, endValue, iterations, roundTen));
  }

  return (
    <>
      <section id="formbar">
        <form onSubmit={handleSubmit}>
          <div className="input-col" title="The starting value of the series">
            <label htmlFor="start">Start</label>
            <input type="number" name="start" placeholder="10" min="1" defaultValue={startValue} onChange={e => setStartValue(parseInt(e.target.value))} />
          </div>
          <div className="input-col" title="The ending value of the series">
            <label htmlFor="end">End</label>
            <input type="number" name="end" placeholder="20000" min="1" defaultValue={endValue} onChange={e => setEndValue(parseInt(e.target.value))} />
          </div>
          <div className="input-col" title="The number of values to generate">
            <label htmlFor="iterations">Iterations</label>
            <input type="number" name="iterations" placeholder="10" min="2" defaultValue={iterations} onChange={e => setIterations(parseInt(e.target.value))} />
          </div>
          <div className="input-col">
            <button
              id="auto-update-btn"
              className={"icon-btn" + (autoUpdate ? " active" : "")}
              onClick={() => setAutoUpdate(!autoUpdate)}
              title="Automatically submits the form when the values are changed"
            >⟳</button>
            <button
              id="random-btn"
              onClick={randomizeValues}
              title="Generates random numbers for the start and end values"
            >🎲</button>
            <div className="input-row" title="Whether to round the last value to the nearest multiple of 10">
              <input type="checkbox" name="roundTen" defaultChecked={roundTen} onChange={e => setRoundTen(parseInt(e.target.checked))} />
              <label htmlFor="roundTen">Round 10</label>
            </div>
            <input
              id="submit-btn"
              type="submit"
              title="Generate a simple series of exponential values"
              value={autoUpdate ? "Generation is automatic" : "Generate"}
              disabled={autoUpdate}
            />
          </div>
        </form>
      </section>
      <main>
        <ul>
          {values && values.map((value, i) => (
            <li key={i + "-" + value}>
              <div className={(`nb ${((i + 1) % 5) === 0 ? " five" : ""}`).trim()}><p>{i + 1}</p></div>
              <div className="value"><p>{value}</p></div>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App;
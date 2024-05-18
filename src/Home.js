import { useEffect, useState } from 'react';
import { generateExponentialValues } from './utils/generateExponentialValues.js';
import { randomBetween } from './utils/randomBetween.js';
import './Home.css';
import menuArrow from "./img/menu_arrow.png";

const App = () => {
  const [startValue, setStartValue] = useState(159);
  const [endValue, setEndValue] = useState(21500);
  const [iterations, setIterations] = useState(10);
  const [roundTen, setRoundTen] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [values, setValues] = useState(generateExponentialValues(startValue, endValue, iterations, roundTen));
  const [displayFormbar, setDisplayFormbar] = useState(true);

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
      <section id="formbar" className={displayFormbar ? "visible" : "folded"}>
        <form id="sesg-form" onSubmit={handleSubmit}>
          <div className={"input-col" + (displayFormbar ? "" : " hidden")} title="The starting value of the series">
            <label htmlFor="start">Start</label>
            <input type="number" name="start" placeholder="10" min="1" defaultValue={startValue} onChange={e => setStartValue(parseInt(e.target.value))} />
          </div>
          <div className={"input-col" + (displayFormbar ? "" : " hidden")} title="The ending value of the series">
            <label htmlFor="end">End</label>
            <input type="number" name="end" placeholder="20000" min="1" defaultValue={endValue} onChange={e => setEndValue(parseInt(e.target.value))} />
          </div>
          <div className={"input-col" + (displayFormbar ? "" : " hidden")} title="The number of values to generate">
            <label htmlFor="iterations">Iterations</label>
            <input type="number" name="iterations" placeholder="10" min="2" defaultValue={iterations} onChange={e => setIterations(parseInt(e.target.value))} />
          </div>
          <div className={"input-col" + (displayFormbar ? "" : " hidden")}>
            <div className="btn-row">
              <button
                id="random-btn"
                className="icon-btn active"
                onClick={randomizeValues}
                title="Generates random numbers for the start and end values\n(Not recommended if you have a lot of iterations)"
              >🎲</button>
              <button
                id="round-ten-btn"
                className={"icon-btn" + (roundTen ? " active" : "")}
                onClick={() => setRoundTen(!roundTen)}
                title="Whether to round the last value to the nearest multiple of 10"
              >🔟</button>
              <button
                id="auto-update-btn"
                className={"icon-btn" + (autoUpdate ? " active" : "")}
                onClick={() => setAutoUpdate(!autoUpdate)}
                title="Automatically submits the form when the values are changed&#013;(Not recommended if you have a lot of iterations)"
              >🔄</button>
            </div>
            <input
              id="submit-btn"
              type="submit"
              title="Generate a simple series of exponential values"
              value={autoUpdate ? "Generation is automatic" : "Generate"}
              disabled={autoUpdate}
            />
          </div>
          <div className="input-col mobile">
            <button
              id="display-btn"
              className={"icon-btn" + (displayFormbar ? "" : " active")}
              onClick={() => setDisplayFormbar(!displayFormbar)}
              title="Toggles formbar visibility"
            >
              <img id="menu-arrow" src={menuArrow} />
            </button>
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
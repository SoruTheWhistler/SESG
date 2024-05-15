import { useEffect, useState } from 'react';
import { generateExponentialValues } from './generateExponentialValues.js';
import './App.css';

const App = () => {
  const [startValue, setStartValue] = useState(159);
  const [endValue, setEndValue] = useState(21500);
  const [iterations, setIterations] = useState(10);
  const [roundTen, setRoundTen] = useState(true);
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(generateExponentialValues(startValue, endValue, iterations, roundTen));
  }, [startValue, endValue, iterations, roundTen])
  const handleSubmit = (event) => {
    event.preventDefault();
    setStartValue(parseInt(event.target.start.value));
    setEndValue(parseInt(event.target.end.value));
    setIterations(parseInt(event.target.iterations.value));
    setRoundTen(event.target.roundTen.checked);
  }

  return (
    <>
      <section id="form-bar">
        <form onSubmit={handleSubmit}>
          <div className="input-col" title="The starting value of the series">
            <label htmlFor="start">Start</label>
            <input type="number" name="start" placeholder="10" min="1" defaultValue={startValue} />
          </div>
          <div className="input-col" title="The ending value of the series">
            <label htmlFor="end">End</label>
            <input type="number" name="end" placeholder="20000" min="1" defaultValue={endValue} />
          </div>
          <div className="input-col" title="The number of values to generate">
            <label htmlFor="iterations">Iterations</label>
            <input type="number" name="iterations" placeholder="10" min="2" defaultValue={iterations} />
          </div>
          <div className="input-col">
            <div className="input-row" title="Whether to round the last value to the nearest multiple of 10">
              <input type="checkbox" name="roundTen" defaultChecked="true"/>
              <label htmlFor="roundTen">Round 10</label>
            </div>
            <input type="submit" title="Generate a simple series of exponential values" value="Generate"/>
          </div>
        </form>
      </section>
      <main>
        <ul>
          {values && values.map((value, i) => (
            <li key={i + "-" + value}>
              <div className={(`nb ${((i + 1) % 10) === 0 ? " tens" : ""}`).trim()}><p>{i + 1}</p></div>
              <div className="value"><p>{value}</p></div>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App;
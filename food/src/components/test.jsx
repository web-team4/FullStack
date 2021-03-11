import React from "react"
import "../css/test.css"

const problem = [
  "오늘, 대학교 후문의 날씨는 어떤가요?",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
]
const answer = [
  [
    { text: "추적추적 비내리는 날", version: 0 },
    { text: "티끌 하나 없이 맑은 날", version: 1 },
  ],
  [
    { text: "2-1", version: 0 },
    { text: "2-2", version: 1 },
  ],
  [
    { text: "3-1", version: 0 },
    { text: "3-2", version: 1 },
  ],
  [
    { text: "4-1", version: 0 },
    { text: "4-2", version: 1 },
  ],
  [
    { text: "5-1", version: 0 },
    { text: "5-2", version: 1 },
  ],
  [
    { text: "6-1", version: 0 },
    { text: "6-2", version: 1 },
  ],
  [
    { text: "7-1", version: 2 },
    { text: "7-2", version: 3 },
  ],
  [
    { text: "8-1", version: 2 },
    { text: "8-2", version: 3 },
  ],
  [
    { text: "9-1", version: 2 },
    { text: "9-2", version: 3 },
  ],
  [
    { text: "10-1", version: 2 },
    { text: "10-2", version: 3 },
  ],
  [
    { text: "11-1", version: 2 },
    { text: "11-2", version: 3 },
  ],
  [
    { text: "12-1", version: 2 },
    { text: "12-2", version: 3 },
  ],
]

class Test extends React.Component {
  state = {
    score: [0, 0, 0, 0],
    prevScore: [],
    idx: 0,
  }
  nextf = (e, v) => {
    let temp = JSON.parse(JSON.stringify(this.state.score))

    let prev = JSON.parse(JSON.stringify([...this.state.prevScore, temp]))
    temp[v]++
    if (this.state.idx !== 11)
      this.setState({
        idx: this.state.idx + 1,
        score: temp,
        prevScore: prev,
      })
  }
  prevf = (e, v) => {
    if (this.state.idx !== 0) {
      let newPrev = this.state.prevScore
      let temp = newPrev[newPrev.length - 1]
      this.setState({
        idx: this.state.idx - 1,
        score: temp,
        prevScore: newPrev.slice(0, newPrev.length - 1),
      })
    }
  }
  render() {
    let idx = this.state.idx
    return (
      <div className="test">
        <div className="inner">
          <h2 className="question">Q{idx + 1}.</h2>
          <h1 className="main">{problem[idx]}</h1>
        </div>
        <div className="contents">
          <ul>
            <li>
              <button type="button" onClick={(e) => this.nextf(e, answer[idx][0].version)}>
                {answer[idx][0].text}
              </button>
            </li>
            <li>
              <button type="button" onClick={(e) => this.nextf(e, answer[idx][1].version)}>
                {answer[idx][1].text}
              </button>
            </li>
          </ul>
        </div>
        <div class="arr">
          {idx !== 0 && (
            <button className="arrow" onClick={(e) => this.prevf(e)}>
              {"<<"}
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default Test

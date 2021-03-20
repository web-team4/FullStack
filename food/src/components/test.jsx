import React from "react"
import Axios from "axios"
import "../css/test.css"

const problem = [
  "여러 사람과 술을 마시러 갔다면?",
  "내일 파스타를 만들어 먹기로 했다면?",
  "같이 밥먹는 친구의 쩝쩝소리가 거슬린다면?",
  "다이어트를 결심한 당일 치킨이 먹고싶다면?",
  "둘 중 선호하는 식사자리는?",
  "아이스크림 매장에 갔다면?",
  "어색한 사이인 친구가 음식을 해줬는데 밍밍하다면?",
  "힘든 일을 끝내고 술을 마시러 갔다면?",
  "곱창집에서 서비스로 나온 라면이 맛있다면?",
  "인터넷으로 찾아 간 맛집의 웨이팅이 2시간이라면?",
  "친구가 우울해서 단 게 땡긴다고 한다면?",
  "친구와 맛집을 가기로 약속했다면?"
]
const answer = [
  [
    { text: "내가 먹고 싶은 안주를 말한다.", version: 0 , value:"e"},
    { text: "다른 사람이 시킨 안주를 먹는다.", version: 0 , value:"i" }
  ],
  [
    { text: "파스타가 얼마나 맛있게 될 지 상상한다.", version: 1 , value:"n" },
    { text: "파스타 재료를 어떤 걸 사야 할 지 생각한다.", version: 1 , value:"s"}
  ],
  [
    { text: "친구에게 말한다.", version: 2 , value:"t" },
    { text: "말하지 못한다.", version: 2 , value:"f" }
  ],
  [
    { text: "치킨을 시킨다.", version: 3 , value:"p" },
    { text: "닭가슴살을 먹는다.", version: 3 , value:"j" }
  ],
  [
    { text: "활기차고 즐거운 분위기의 다수와 식사", version: 0 , value:"e"},
    { text: "조곤조곤 수다떨 수 있는 소수와 식사", version: 0 , value:"i" }
  ],
  [
    { text: "새로 나온 맛을 고른다.", version: 1 , value:"n" },
    { text: "평소에 좋아하던 맛을 고른다.", version: 1 , value:"s"}
  ],
  [
    { text: "소금을 더 넣어야 할 것 같다고 말한다.", version: 2 , value:"t" },
    { text: "맛있다고 하고 음식에 대한 언급을 하지 않는다.", version: 2 , value:"f" }
  ],
  [
    { text: "내일의 나는 생각하지 않고 죽어라 마신다.", version: 3 , value:"p" },
    { text: "적당히 조절해가며 마신다.", version: 3 , value:"j" }
  ],
  [
    { text: "무슨 라면인지 물어본다.", version: 0 , value:"e"},
    { text: "물어보지 않는다.", version: 0 , value:"i" }
  ],
  [
    { text: "기다려서 맛집에서 밥을 먹는다.", version: 1 , value:"n" },
    { text: "옆 가게에 가서 먹는다.", version: 1 , value:"s"}
  ],
  [
    { text: "단 음식 어떤게 땡기는지 물어본다.", version: 2 , value:"t" },
    { text: "왜 우울한지 물어본다.", version: 2 , value:"f" }
  ],
  [
    { text: "미리 어느 식당으로 갈지 선정 후 위치를 찾아보고 간다.", version: 3 , value:"p" },
    { text: "당일 걸어다니며 끌리는 음식점으로 즉흥적으로 들어간다.", version: 3 , value:"j" }
  ]
]

class Test extends React.Component {
  state = {
    score: [0, 0, 0, 0],
    prevScore: [],
    idx: 0,
  }
  nextf = (e, version, value) => {
    let temp = JSON.parse(JSON.stringify(this.state.score))
    let prev = JSON.parse(JSON.stringify([...this.state.prevScore, temp]))
    // 추가한 부분
    if(value=="e"||value=="n"||value=="t"||value=="p"){
      console.log(value);
      temp[version]++ // 버전 0:e/i, 1:n/s, 2:t/f 3:p/j
    }
    if (this.state.idx !== 11){
      this.setState({
        idx: this.state.idx + 1,
        score: temp,
        prevScore: prev
      })
    }
    console.log(this.state.idx, this.state.score, temp);
    if (this.state.idx == 11) {
      var ei = (temp[0]>1 ?  "e" : "i");
      var ns = (temp[1]>1 ?  "n" : "s");
      var tf = (temp[2]>1 ?  "t" : "f");
      var pj = (temp[3]>1 ?  "p" : "j");
      var user_mbti = ei + ns + tf + pj;
      console.log(user_mbti);
      Axios.post("/test",{
        mbti:user_mbti
      }) // post로 결과 넘겨서 db에 저장되도록!
          .then((res) => {
            this.props.history.push("/test_result")
          })
    }
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
              <button type="button" onClick={(e) => this.nextf(e, answer[idx][0].version, answer[idx][0].value)}>
                {answer[idx][0].text}
              </button>
            </li>
            <li>
              <button type="button" onClick={(e) => this.nextf(e, answer[idx][1].version, answer[idx][1].value)}>
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

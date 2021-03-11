import React from "react"
import Input from "./inputs"
import "../css/register.css"
import Select from "./selects"
import register_title from "../images/register_title.PNG"
import { withRouter, Link } from "react-router-dom"
import Axios from "axios"
Axios.defaults.withCredentials = true
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flag: true,
      _id: "",
      _password: "",
      passwordCheck: "",
      nickName: "",
      name: "",
      question: "질문 1",
      answer: "",
      possible: { _id: false, _password: false, passwordCheck: false, nickName: false },
    }
  }
  handleForm = (e) => {
    console.log("??????")
    e.preventDefault()
    let temp = Object.values(this.state.possible)
    console.log(temp)
    let check = true
    for (let i = 0; i < temp.length; i++)
      if (temp[i] === false) {
        check = false
        break
      }
    if (check && this.state.name && this.state.answer) {
      Axios.post("/auth", {
        user_id: this.state._id,
        user_password: this.state._password,
        user_realname: this.state.name,
        user_nickname: this.state.nickName,
        user_q: this.state.question,
        user_a: this.state.answer,
      })
        .then((res) => {
          alert("회원가입 성공!")
          this.props.history.push("/login")
        })
        .catch((err) => {
          alert("회원가입 실패 ㅠㅠ")
          console.log(err)
          this.props.history.push("/login")
        })
    } else {
      alert("다시 확인해 주세요")
    }
  }
  version = () => {
    this.setState((state) => {
      return { flag: !state.flag }
    })
  }
  handle = (e, v) => {
    if (v === undefined) this.setState({ [e.target.name]: e.target.value })
    else {
      console.log(e)
      if (e.target.name === "passwordCheck" && v)
        this.setState({
          possible: { ...this.state.possible, _password: true, passwordCheck: true },
        })
      else this.setState({ possible: { ...this.state.possible, [e.target.name]: v } })
    }
  }
  render() {
    //n, placeholder, message, type, up
    const visi1 = this.state.flag ? { display: "block" } : { display: "none" }
    const visi2 = this.state.flag ? { display: "none" } : { display: "block" }

    return (
      <div className="all">
        <section className="titleBox">
          <div className="title">
            <img src={register_title} alt="" />
            <h1>회원가입</h1>
          </div>
          <span className="line"></span>
        </section>

        <section className="description">
          <h1 className="title" style={visi1}>
            Welcome!
          </h1>
          <p style={visi1}>
            Bridge.inha는 Psychological test(심리테스트)의 결과를 기반으로 사용자에게 인하대학교
            후문 근처의 음식점을 소개하는 서비스 입니다.
          </p>
          <p id="para" style={visi1}>
            웹서비스 이용과 회원 등록을 위해 아래의 내용을 입력해주세요.
          </p>
          <p id="secondP" style={visi2}>
            * 본인확인용 질문과 답변은 아이디와 비밀번호를 찾을 때 사용합니다.
          </p>
        </section>
        <form
          onSubmit={(e) => {
            this.handleForm(e)
          }}
        >
          <section className="input_list">
            <ul style={visi1}>
              <li>
                <Input
                  placeholder=""
                  message=""
                  type="text"
                  up="아이디"
                  name="_id"
                  handle={this.handle}
                />
              </li>
              <li>
                <Input
                  placeholder=""
                  message=""
                  type="password"
                  up="비밀번호"
                  name="_password"
                  handle={this.handle}
                  pwc={this.state.passwordCheck}
                />
              </li>
              <li>
                <Input
                  placeholder=""
                  message=""
                  type="password"
                  up="비밀번호 확인"
                  name="passwordCheck"
                  handle={this.handle}
                  pw={this.state._password}
                />
              </li>
              <li>
                <Input
                  placeholder=""
                  message=""
                  type="text"
                  up="닉네임"
                  name="nickName"
                  handle={this.handle}
                />
              </li>
            </ul>

            <ul style={visi2}>
              <li>
                <Input
                  placeholder=""
                  message=""
                  type="text"
                  up="이름"
                  name="name"
                  handle={this.handle}
                />
              </li>
              <li>
                <Select
                  value="선택하세요"
                  message=""
                  type="text"
                  up="본인 확인용 질문"
                  name="question"
                  handle={this.handle}
                />
              </li>
              <li>
                <Input
                  placeholder=""
                  message=""
                  type="text"
                  up="답변"
                  name="answer"
                  handle={this.handle}
                />
              </li>
            </ul>
          </section>
          <section className="next">
            <Link to="register" className="prevPage" onClick={this.version} style={visi2}>
              이전
            </Link>
            <Link to="register" className="nextPage" onClick={this.version} style={visi1}>
              다음
            </Link>
            <button className="complete" type="submit" style={visi2}>
              제출하기
            </button>
          </section>
        </form>
      </div>
    )
  }
}
export default withRouter(Register)

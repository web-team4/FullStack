import React from "react"
import "../css/board.css"
import board1 from "../images/coffee2.png"
import board2 from "../images/search1.png"
import board3 from "../images/heart.png"
import board4 from "../images/chat.png"
import { Link } from "react-router-dom"

class BoardRow extends React.Component {
  render() {
    let version = this.props.num % 2 === 1 ? " #f1f1f1" : " white"
    let style = { background: version }
    return (
      <tr className="Boardrow" style={style}>
        <td>
          <Link
            to={{
              pathname: `/board/page/${this.props.id}`,
              state: {
                id: this.props.id,
                title: this.props.title,
                writer: this.props.writer,
                view: this.props.view,
                date: this.props.date,
                des: this.props.des,
              },
            }}
          >
            {this.props.id}
          </Link>
        </td>
        <td>
          <Link
            to={{
              pathname: `/board/page/${this.props.id}`,
              state: {
                id: this.props.id,
                title: this.props.title,
                writer: this.props.writer,
                view: this.props.view,
                date: this.props.date,
                des: this.props.des,
              },
            }}
          >
            {this.props.title}
          </Link>
        </td>
        <td>
          <Link
            to={{
              pathname: `/board/page/${this.props.id}`,
              state: {
                id: this.props.id,
                title: this.props.title,
                writer: this.props.writer,
                view: this.props.view,
                date: this.props.date,
                des: this.props.des,
              },
            }}
          >
            {this.props.date}
          </Link>
        </td>

        <td>
          <Link
            to={{
              pathname: `/board/page/${this.props.id}`,
              state: {
                id: this.props.id,
                title: this.props.title,
                writer: this.props.writer,
                view: this.props.view,
                date: this.props.date,
                des: this.props.des,
              },
            }}
          >
            {this.props.writer}
          </Link>
        </td>
        <td>
          <Link
            to={{
              pathname: `/board/page/${this.props.id}`,
              state: {
                id: this.props.id,
                title: this.props.title,
                writer: this.props.writer,
                view: this.props.view,
                date: this.props.date,
                des: this.props.des,
              },
            }}
          >
            {this.props.view}
          </Link>
        </td>
        <td>
          <Link
            to={{
              pathname: `/board/page/${this.props.id}`,
              state: {
                id: this.props.id,
                title: this.props.title,
                writer: this.props.writer,
                view: this.props.view,
                date: this.props.date,
                des: this.props.des,
              },
            }}
          >
            {this.props.like}
          </Link>
        </td>
        <td>
          <Link
            to={{
              pathname: `/board/page/${this.props.id}`,
              state: {
                id: this.props.id,
                title: this.props.title,
                writer: this.props.writer,
                view: this.props.view,
                date: this.props.date,
                des: this.props.des,
              },
            }}
          >
            {this.props.comments}
          </Link>
        </td>
      </tr>
    )
  }
}
class Board extends React.Component {
  getList = () => {
    let lists = [
      {
        id: 1,
        title: "one",
        date: "03-06",
        writer: "sohee",
        view: 1,
        like: 10,
        comments: 11,
        des: "    TE  ST",
      },
      {
        id: 2,
        title: "one",
        date: "03-06",
        writer: "sohee",
        view: 1,
        like: 10,
        comments: 11,
        des: "TEST \n\n\n test",
      },
      {
        id: 3,
        title: "one",
        date: "03-06",
        writer: "sohee",
        view: 1,
        like: 10,
        comments: 11,
        des: "TEST <br/> test <br/>",
      },
      {
        id: 4,
        title: "one",
        date: "03-06",
        writer: "sohee",
        view: 1,
        like: 10,
        comments: 11,
        des: "TEST",
      },
    ]

    for (let i = lists.length; i < 15; i++)
      lists.push({
        id: "",
        title: "test",
        date: "",
        writer: "",
        view: "",
        like: "",
        comments: "",
      })
    let ret = lists.map((l, idx) => {
      return (
        <BoardRow
          num={idx}
          key={idx}
          id={l.id}
          title={l.title}
          date={l.date}
          writer={l.writer}
          view={l.view}
          like={l.like}
          comments={l.comments}
          des={l.des}
        ></BoardRow>
      )
    })
    return ret
  }
  render() {
    let lists = this.getList()

    return (
      <div className="board">
        <div className="image">
          <img src={board1} alt="" />
        </div>
        <h3>자유 게시판</h3>
        <h5>
          로그인 후, 심리테스트 결과 및 인하대학교 후문
          <br />
          맛집에 대하여 자유롭게 이야기를 나눌 수 있는 게시판입니다.
        </h5>
        <div className="text">
          <div className="search">
            <Link to="board/write">
              <input type="button" className="write" value="글 작성" />
            </Link>

            <ul>
              <li>
                <input type="text" />
              </li>
              <li>
                <img src={board2} alt="" />
              </li>
            </ul>
          </div>
          <table>
            <thead>
              <tr>
                <th className="head-1">NO.</th>
                <th className="head-2">제목</th>
                <th className="head-3">날짜</th>
                <th className="head-4">작성자</th>
                <th className="head-5">조회수</th>
                <th className="head-6">
                  <img src={board3} alt="" width="20px" />
                </th>
                <th className="head-7">
                  <img src={board4} alt="" width="20px" />
                </th>
              </tr>
            </thead>
            <tbody>{lists}</tbody>
          </table>
          <div className="pagenum">
            [1] [2] [3] [4] ... <button>{">"}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Board

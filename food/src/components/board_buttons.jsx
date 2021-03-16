import React from "react"
import { Link } from "react-router-dom"
import "../css/board_buttons.css"
import PropTypes from "prop-types"

class BoardBtn extends React.Component {
  //props : 현재 페이지, 최대 페이지, 페이지 변경 함수(숫자 클릭)
  //state : 보일 페이지 시작 번호, 보일 페이지 끝 번호
  //일반 함수 : 보일 페이지 시작 끝 변경 (화살표 클릭)
  state = {
    start: 1,
    end: 2,
    renderFlag: true,
  }
  linkClick = (e) => {
    let value = e.target.innerText
    this.props.handle(value)
  }
  buttonClick = (e) => {
    if (e.target.innerText === "<" && this.state.start !== 1) {
      this.setState({ start: this.state.start - 5, end: this.state.start - 1, renderFlag: false })
    } else if (e.target.innerText === ">" && this.state.end !== this.props.lastPageNum) {
      let next = Math.min(this.state.end + 5, this.props.lastPageNum)

      this.setState({ start: this.state.start + 5, end: next, renderFlag: false })
    }
  }
  checkNum = () => {
    let { pageNum, lastPageNum } = this.props

    pageNum = Math.floor((pageNum - 1) / 5) * 5 + 1
    let endpage = pageNum + 4 > lastPageNum ? lastPageNum : pageNum + 4

    if (pageNum !== this.state.start || endpage !== this.state.end)
      this.setState({ start: pageNum, end: endpage })
  }

  render() {
    if (this.state.renderFlag) this.checkNum()
    const linkStyle = {
      background: "#bcbcbc",
    }
    let lists = []
    lists.push(
      <button onClick={(e) => this.buttonClick(e)} key={-1}>
        {"<"}
      </button>
    )
    for (let i = this.state.start; i <= this.state.end; i++) {
      if (i != this.props.pageNum) {
        lists.push(
          <Link to={{ pathname: `/board/page${i}` }} onClick={(e) => this.linkClick(e)} key={i}>
            {i}
          </Link>
        )
      } else
        lists.push(
          <Link
            to={{ pathname: `/board/page${i}` }}
            onClick={(e) => this.linkClick(e)}
            style={linkStyle}
            key={i}
          >
            {i}
          </Link>
        )
    }
    lists.push(
      <button onClick={(e) => this.buttonClick(e)} key={-2}>
        {">"}
      </button>
    )
    return <div className="btns">{lists}</div>
  }
}
BoardBtn.propTypes = {
  pageNum: PropTypes.number,
}
export default BoardBtn

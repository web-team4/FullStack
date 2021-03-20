import React from "react"
import Axios from "axios"
import "../css/board.css"

class Test_result extends React.Component {
  state = {menu : "" ,
    desc :"",
    map:""}

  componentDidMount(){
    Axios.post("/test_result",{})
        .then((res) => {
          this.setState({
            menu: res.data.menu,
            desc: res.data.desc,
            map: res.data.map})
        })
  }

  render() {
    let menu = this.state.menu
    let desc = this.state.desc
    let map = this.state.map
    return (
        <div className="Box">결과 페이지
          <div className="Menu">{menu}</div>
          <div className="Desc">{desc}</div>
          <div className="Map">{map}</div>
        </div>
    )
  }
}
export default Test_result

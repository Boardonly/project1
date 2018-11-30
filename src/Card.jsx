class Card extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        fliped: false,
        match: false,
        
      }

    }
 
    render() {
      // console.log(<Card/>)
      return(
        <div className="card" 
        key={this.props.key}
        name={this.props.suits}
        onClick={this.mouseClick}
        >
          <div className="front">
          <img src={"https://raw.githubusercontent.com/Boardonly/project1/master/images/back.jpg"}/>
          </div>
          <div className="back">
            <img src={"https://raw.githubusercontent.com/Boardonly/project1/master/images/" + this.props.suits + ".jpg"}/>
          </div>
        </div>
  
      )
    }
  }

// // class Card extends React.Component {
// //     constructor(props) {
// //         super(props)
// //     }
// //     render() {
// //       return (
// //         <div className="card">
// //           <div className="front">
// //             ?
// //           </div>
// //           <div className="back">
// //             <img src={"https://raw.githubusercontent.com/Boardonly/project1/master/images/" + this.props.suits + ".jpg"}/>
// //           </div>
// //         </div>
// //       )
// //     }
// //   }

// // export defalt Card
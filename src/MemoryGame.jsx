import React from 'react'
import ReactDOM from 'react-dom'



class MemoryGame extends React.Component{
  constructor(){
    super();
      this.state = {
          suits:['0001','0002','0003','0004','0005','0006',
          '0007','0008','0001','0002','0003','0004','0005','0006',
          '0007','0008',],
      }
      this.showCard = this.showCard.bind(this);
    
  }  
 
  showCard(props){
    const newSuits = props.suits.sort(() => {return .5 - Math.random()});
   return newSuits.map((suits)=> <Card key={suits.id} suits={suits} />)
    }         
  
  matchCard(){
    
  }
   
  render(){
      return (
        <div className="playground">
            <this.showCard suits = {this.state.suits}/>
        </div>
      )
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////  
class Card extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        fliped: false,
        match: false,
       }
       this.mouseClick = this.mouseClick.bind(this);
    }
    mouseClick(){ 
     this.setState({fliped: true})
  }

    render() {
      // console.log(<Card/>)
      return(
        <div className={"card " + (this.state.fliped ? 'flip' : '')} 
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

  ReactDOM.render( <MemoryGame />, document.getElementById('memory'))
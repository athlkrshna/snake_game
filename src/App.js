import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';
import logo from './snake2.png';
import Obstacle from './obstacles';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: '',
  temp:'',
  pattern:null,
  snakeDots: [
    [0,0],
    [2,0],
    [4,0]
  ],
  obstacles: [
    [30,20],[32,20],[34,20],[36,20],[38,20],[40,20],[42,20],[44,20],[46,20],[48,20],[50,20],[52,20],[54,20],[56,20],[58,20],[60,20],[62,20],[64,20],[66,20],[68,20],[70,20],
    [30,70],[32,70],[34,70],[36,70],[38,70],[40,70],[42,70],[44,70],[46,70],[48,70],[50,70],[52,70],[54,70],[56,70],[58,70],[60,70],[62,70],[64,70],[66,70],[68,70],[70,70]

  ],
  obstacles2: [
    [30,20],[32,20],[34,20],[36,20],[38,20],[40,20],[42,20],[44,20],[46,20],[48,20],[50,20],[30,20],[30,22],[30,24],[30,26],[30,28],[30,30],[30,32],[30,34],[30,36],[30,38],[30,40],
    [52,70],[54,70],[56,70],[58,70],[60,70],[62,70],[64,70],[66,70],[68,70],[70,70],[70,50],[70,52],[70,54],[70,56],[70,58],[70,60],[70,62],[70,64],[70,66],[70,68],[70,70]

  ],
  obstacles3: []
}


class App extends Component {
  state = initialState;
  componentDidMount() {
    document.onkeydown = this.onKeyDown;
    setInterval(this.moveSnake, this.state.speed);
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    if(this.state.pattern){
    this.checkforObstacle();}
    if (this.state.direction){
    this.checkIfCollapsed();}
    this.checkIfEat();
    
    
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case '':
        break;
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    if (this.state.direction){
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length -1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }
  checkforObstacle() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length -1];
    let obs = [...this.state.pattern];
    obs.pop();
    obs.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }
  getdir(){
    this.setState({temp: this.state.direction})
  }
  startgame(){ 
    if(this.state.direction)
    {this.getdir();
    this.setState({
      direction: ''
    })}
    else if(!this.state.direction && this.state.temp)
    this.setState({
      direction: this.state.temp
    })
    else if(!this.state.direction)
    this.setState({
      direction: 'RIGHT'
    })
  }
  selectpattern() {
    this.setState({pattern:this.state.obstacles})
  }
  selectpattern2() {
    this.setState({pattern:this.state.obstacles2})
  }
  selectpattern3() {
    this.setState({pattern:this.state.obstacles3})
  }
  render() {
    return (
      <div>
        <div className="title"><h1>SNAKE GAME<span><img id="logo" src={logo} /></span></h1> </div>
      <div className="game">
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots}/>
          <Food dot={this.state.food}/>
          {this.state.pattern==this.state.obstacles && <Obstacle pattern={this.state.obstacles}/>}
          {this.state.pattern==this.state.obstacles2 && <Obstacle pattern={this.state.obstacles2}/>}
          {this.state.pattern==this.state.obstacles3 && <Obstacle pattern={this.state.obstacles3}/>}
        </div>
        <div className="score">
          <h1> Score: {this.state.snakeDots.length -3} </h1>
          <div className="btns">
          <button onClick= {() =>this.startgame()}>START|PAUSE</button>
          <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            LEVEL 0
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick = {() =>this.selectpattern3()}>LEVEL 0</Dropdown.Item>
            <Dropdown.Item onClick= {() =>this.selectpattern()}>LEVEL 1</Dropdown.Item>
            <Dropdown.Item  onClick= {() =>this.selectpattern2()}>LEVEL 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        </div>
        
      </div>
      </div>
    );
  }
}

export default App;
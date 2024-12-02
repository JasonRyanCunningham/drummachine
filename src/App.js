import React from 'react';
import './App.scss';

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
    };
    
    this.soundMap = new Map();
    this.soundMap.set("Q", 
      {description: "Heater-1", clip: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"});
    this.soundMap.set("W", 
      {description: "Heater-2", clip: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3"});
    this.soundMap.set("E", 
      {description: "Heater-3", clip: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3"});
    this.soundMap.set("A", 
      {description: "Heater-4", clip: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"});
    this.soundMap.set("S", 
      {description: "Clap", clip: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3"});
    this.soundMap.set("D", 
      {description: "Open-HH", clip: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"});
    this.soundMap.set("Z", 
      {description: "Kick-n'-Hat", clip: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3"});
    this.soundMap.set("X", 
      {description: "Kick", clip: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3"});
    this.soundMap.set("C", 
      {description: "Closed-HH", clip: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"});

    this.keySelected = this.keySelected.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    switch(event.key.toUpperCase()) {
      case 'Q':
      case 'W':
      case 'E':
      case 'A':
      case 'S':
      case 'D':
      case 'Z':
      case 'X':
      case 'C':
        this.keySelected(event.key.toUpperCase());
        break;
      default:
        break;
    }
  }

  keySelected(letter) {
    this.setState({
      display: this.soundMap.get(letter).description,
    });
    new Audio(this.soundMap.get(letter).clip).play();
  }

  render () {
    const drumRow1 = [];
    const drumRow2 = [];
    let i = 0;
    
    for(const [key, obj] of this.soundMap) {
      i = i + 1;
      if(i <= 4) {
        drumRow1.push(<DrumPad key={key} letter={key} clip={obj.clip} description={obj.description} onClick={()=>{this.keySelected(key)}} /> );
      } else {
        drumRow2.push(<DrumPad key={key} letter={key} clip={obj.clip} description={obj.description} onClick={()=>{this.keySelected(key)}} /> );
      }
      
    }
    return (
      <div id='drum-machine'>
        <Display value={this.state.display}/>
        <div class='drum-row'>
          {drumRow1}
        </div>
        <div>
          {drumRow2}
        </div>
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return (
      <div id='display'>{this.props.value}</div>
    );
  }
}

class DrumPad extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} class='drum-pad' id={this.props.description}>
        {this.props.letter}
        <audio src={this.props.clip} id={this.props.letter}>
          <source src={this.props.clip} type="audio/mp3" /> 
        </audio>
      </button>
    );
  }  
}


export default DrumMachine;

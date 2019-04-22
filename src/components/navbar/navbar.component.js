import React from 'react';

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            logoText: "WEATHER",
        }
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(){
        window.location.reload();
    }

  render() {
    return (
      <div>
          {/* navbar */}
        <nav className="navbar navbar-expand-lg navbar-static-top scrolling-navbar">    
            {/* navbar brand */}
            <a href="#!" className="navbar-brand center text-white" onClick={this.handleOnClick}
                style={{fontWeight: 'bold', fontSize: '1.9rem', textShadow: '2px 2px 4px #000000' }}>
                {this.state.logoText}
            </a>
        </nav>
      </div>
    )
  }
}

export default NavBar;

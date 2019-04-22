import React from 'react';

class Display extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props;
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data.name !== this.props.data.name) {
          this.setState({data: this.props.data});
        }
      }

  render() {
        if (document.documentElement.clientWidth > 650) {
            var mediaStyling = { fontSize: '3vh', background :'rgba(0,0,0,0.3)' };
        }
        else {
            var mediaStyling = { fontSize: '3vh' };
        }
    
      return (
        <div className="container text-white vertical-center" style={{ height: '85vh' }} >
             <div className="row" >

              <div className="col-xl-4 col-sm-12 col-xs-12 " style={{ textShadow: '2px 2px 4px #000000' }}>
                <div className="text-center font-weight-bold text-capitalize align-middle"
                    style={{ fontSize: '7vh' }}
                >
                    { this.state.data.name }
                </div> 
                <div className="text-center text-capitalize">
                    <span style={{ fontSize: '18vh', fontWeight: 'bold' }}>
                        { Math.round(this.state.data.temp) }
                    </span>
                    <span style= {{fontSize: '6vh'}}>&#8451;</span>
                </div>
              </div>
              
              <div className="col-xl-8 col-sm-12 col-xs-12 row align-items-center" 
                style={mediaStyling}
              >
                    <div className="col col-xs-12 col-sm-12"  >
                        <div className="text-center font-weight-bold text-capitalize padding">
                            { this.state.data.weatherDesc }
                        </div>

                        <div className="text-center font-weight-bold text-capitalize padding">
                            <span>
                                Max. Temp: { this.state.data.tempMax }&#8451;
                            </span>
                        </div>

                        <div className="text-center font-weight-bold text-capitalize padding">
                            <span>
                                Min. Temp: { this.state.data.tempMin }&#8451;
                            </span>
                        </div>

                        <div className="text-center font-weight-bold text-capitalize padding">
                            <span>
                                Humidity: { this.state.data.humidity }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Display;

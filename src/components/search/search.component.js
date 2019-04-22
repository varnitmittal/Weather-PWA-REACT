import React from 'react';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hasSubmitted: false
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange(e){
        this.setState({
            searchText: e.target.value
        });
    }

    handleOnSubmit(e){
        e.preventDefault();
        this.props.func(this.state);
        this.setState({
            hasSubmitted: true,
            searchText: ""
        });

}

  render() {
    return (
        <div className="padding margin"  style = {{textShadow: '2px 2px 4px #000000'}}> 
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xl-12 col-md-12 col-sm-12 col-xs-12">
                    <form className="form-inline md-form mb-4 text-white"  
                        onSubmit={this.handleOnSubmit}
                    >
                        <input className="form-control input-lg text-white col-12" type="text" 
                            placeholder="Search" aria-label="Search"  onChange={this.handleOnChange} 
                            style = {{ fontSize: '20px', background: 'rgba(255,255,255,0.1)'}}
                        />
                        <div className="col-12">
                            <button className="btn btn-outline-white btn-rounded btn-sm col-12" type="submit">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

export default Search;
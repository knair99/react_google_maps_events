import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let zipcode = parseInt(this.searchInput.value, 10);
        this.props.handle_search(zipcode);
    }
    render() {
        return (
            <div className='container' style={{'marginLeft': '0px', 'marginRight': '0px', 'maxWidth': '100%'}}>
                <div className='row' style={{'marginTop': '10px'}}>
                    <div className='col-md-12'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-11" style={{'margin':'0', 'padding':'0', 'border': '0'}}><input
                                            ref={(input) => {
                                                this.searchInput = input;
                                            }}
                                            className='form-control input-lg'
                                            placeholder={'Enter your zipcode'}
                                            style={{
                                                'fontSize': '2rem',
                                                'minHeight': '70px',
                                                'background': 'whitesmoke'
                                            }}
                                            type='text'/>
                                        </div>
                                        <div className="col-md-1" style={{'padding': '0'}}>
                                            <button className='btn btn-primary btn-lg' style={{'height': '100%'}}> Search </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h5>Click on the dots to zoom in. Click marker to toggle info.</h5>
                    </div>
                </div>
            </div>
        );
    }
}

SearchForm.propTypes = {
    handle_search: PropTypes.func
};

export default SearchForm;

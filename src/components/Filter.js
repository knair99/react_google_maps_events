import React, {Component} from 'react';
// import PropTypes from 'prop-types';

class Filter extends Component {
    render() {
        return (
            <div style={{'width': '100%', 'padding': '0px'}}>
                <div >
                    <div className='container' style={{'maxWidth': '100%', 'padding': '0px', 'marginLeft': '0px', 'marginRight': '0px'}}>
                        <div className='row' style={{'paddingRight' : '13px'}}>
                            <div className='col-md-12'>
                                <div className='panel panel-default' style={{'margin': '10px'}}>
                                    <div className='panel-heading'>
                                        <h3 className='panel-title'>Filters </h3></div>
                                    <div className='panel-body'><span> </span>
                                        <form>
                                            <input className='form-control' type='text' style={{'fontSize': '2rem'}}
                                            placeholder={"e.g: Food"}/>
                                            <br/>
                                        </form>
                                        <button className='btn btn-primary' type='button'>Search </button>
                                        <hr/>
                                        <div className="row" data-toggle="collapse" >
                                            <div className="col-md-6">
                                                <div className='checkbox' style={{'fontSize': '13px'}}>
                                                    <label>
                                                        <input type='checkbox'/>Exclude Meetups</label>
                                                </div>
                                                <div className='checkbox' style={{'fontSize': '13px'}}>
                                                    <label>
                                                        <input type='checkbox'/>Exclude Eventful data</label>
                                                </div>
                                                <div className='checkbox' style={{'fontSize': '13px'}}>
                                                    <label>
                                                        <input type='checkbox'/>Exclude Predict data</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className='checkbox'>
                                                    <label style={{'fontSize': '13px'}}>
                                                        <input type='checkbox'/>Exclude Google Places</label>
                                                </div>
                                                <div className='checkbox'>
                                                    <label style={{'fontSize': '13px'}}>
                                                        <input type='checkbox'/>Exclude Eventbrite</label>
                                                </div>
                                            </div>
                                        </div>
                                            <hr/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           )};
}

// Filter.propTypes = {};

export default Filter;


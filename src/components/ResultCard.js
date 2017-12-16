import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const heading_color = {
    'Eventbrite': 'orange',
    'Meetup' : 'red',
    'Predict': 'blue',
    'Google Places': 'green',
    'Eventful': 'lightblue'
};
const dont_highlight = {'borderBottom': 'solid', 'padding':'2px'};
const highlight = {'borderBottom': 'solid', 'background': 'bisque', 'padding': '2px'};

class ResultCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(){
        if(this.props.id === this.props.highlight) {
            ReactDOM.findDOMNode(this).scrollIntoView();
        }
    }

    render() {
        return (
            <div ref={"card_top"}>
                <br/>

                <div style={{'overflowY': 'auto'}}>
                    <div className="col-md-12">
                        <div className='card'>
                            <div className='card-header'
                                 style={{'background': heading_color[this.props.type_event], 'textAlign':'center'}}>
                                <h4 >
                                    {this.props.type_event}
                                </h4>
                            </div>
                            <div className='card-block'
                                 style={this.props.id !== this.props.highlight ?
                                     dont_highlight : highlight}>
                                <h4 className='card-title'> {this.props.meetup_name}</h4>
                                <p className='card-text'> {this.props.event_name} </p>
                                <a href={this.props.event_link} className='btn btn-primary' target="_blank">Go to event</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ResultCard.propTypes = {
    id: PropTypes.number,
    highlight: PropTypes.number
};

export default ResultCard;

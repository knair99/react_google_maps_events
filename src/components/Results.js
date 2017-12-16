import React, {Component} from 'react';
import ResultCard from "./ResultCard";

class Results extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div className={"container"} style={{'height': '50vh', 'overflowY' : 'auto', 'border' : '1px solid', 'borderColor' : '#d9edf7'}}>
                <div className="row" style={{'overflowY': 'auto', 'display': 'block'}}>
                <ul style={{'padding': '0px'}}>
                    {this.props.meetup_data.map( (each, idx) => <ResultCard key={idx} {... each} highlight={this.props.highlight} id={idx}/> )}
                    <br/><br/>
                </ul>
                </div>
            </div>

        );
    }
}
export default Results;

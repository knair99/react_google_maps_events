import React, {Component} from 'react';

class JumboComponent extends Component {
    render() {
        return (
            <div>
                <div className="container" style={{'maxWidth': '100vw'}}>
                    <div className="jumbotron" style={{'margin': '0px', 'padding': '1rem 1rem', 'background': 'lighgray'}}>
                        <h1>What's happening near me?</h1>
                        <p>Search for meetups, happy hours, eventful tickets, etc.</p>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default JumboComponent;

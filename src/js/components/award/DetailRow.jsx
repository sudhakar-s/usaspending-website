/**
 * DetailRow.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    title: React.PropTypes.string,
    value: React.PropTypes.string,
    overflow: React.PropTypes.bool,
    MAXCHARS: React.PropTypes.number
};

export default class DetailRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            moreButton: true,
            buttonValue: 'More',
            arrowValue: (<Icons.AngleDown alt="See full description" />)
        };

        // bind functions
        this.checkOverflow = this.checkOverflow.bind(this);
        this.toggleButton = this.toggleButton.bind(this);
    }

    checkOverflow() {
        let trunc = this.props.value;
        if (this.props.overflow === true && this.state.moreButton === true) {
            trunc = `${this.props.value.substring(0, this.props.MAXCHARS)}...`;
        }
        return trunc;
    }

    toggleButton() {
        const button = !this.state.moreButton;
        let arrow = (<Icons.AngleDown alt="See full description" />);
        let value = 'More';
        if (this.state.buttonValue === 'More') {
            value = 'Less';
            arrow = (<Icons.AngleUp alt="Hide full description" />);
        }
        this.setState({
            moreButton: button,
            buttonValue: value,
            arrowValue: arrow
        });
    }

    render() {
        const value = this.checkOverflow();
        let button = '';
        if (this.props.overflow === true) {
            button = (<button
                onClick={this.toggleButton}
                className="see-more">{this.state.buttonValue} {this.state.arrowValue}</button>);
        }
        return (
            <tr>
                <td>{this.props.title}</td>
                <td>{value} {button}</td>
            </tr>
        );
    }
}
DetailRow.propTypes = propTypes;

/**
 * EntityDropdownAutocomplete.jsx
 * Created by Lizzie Salita 5/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import { AngleDown, AngleUp } from 'components/sharedComponents/icons/Icons';

import EntityDropdownList from './EntityDropdownList';

const propTypes = {
    value: PropTypes.object,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.array,
    selectEntity: PropTypes.func,
    scope: PropTypes.string,
    enabled: PropTypes.bool,
    matchKey: PropTypes.string,
    setSearchString: PropTypes.func,
    searchString: PropTypes.string
};

const defaultProps = {
    enabled: true,
    matchKey: 'name'
};

export default class EntityDropdownAutocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            value: ''
        };

        this.dropdownRef = null;

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.clickedItem = this.clickedItem.bind(this);
        this.handleDeselection = this.handleDeselection.bind(this);

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    componentDidUpdate(prevProps) {
        // Show the autocomplete results when they first become available
        if (prevProps.options.length === 0 && this.props.options.length > 0) {
            this.openDropdown();
        }
    }

    onChange(e) {
        const value = e.target.value;
        this.props.setSearchString(value);
    }

    handleDeselection(e) {
        if (this.wrapperDiv && !this.wrapperDiv.contains(e.target)) {
            // clicked outside the dropdown, close it
            this.closeDropdown();
        }
    }

    openDropdown() {
        this.setState({
            expanded: true
        });
    }

    closeDropdown() {
        this.setState({
            expanded: false
        });
    }

    toggleDropdown(e) {
        e.preventDefault();
        if (this.state.expanded) {
            this.closeDropdown();
            return;
        }

        this.openDropdown();
    }

    clickedItem(item) {
        this.props.setSearchString(item.name);
        this.props.selectEntity(this.props.scope, item);
        this.closeDropdown();
    }

    mouseEnter() {
        if (this.props.enabled) {
            // active filter, do nothing
            return;
        }

        this.setState({
            showWarning: true
        });
    }

    mouseLeave() {
        if (this.state.showWarning) {
            this.setState({
                showWarning: false
            });
        }
    }

    render() {
        let icon = <AngleDown alt="Open dropdown" />;
        if (this.state.expanded) {
            icon = <AngleUp alt="Close dropdown" />;
        }

        let dropdown = null;
        if (this.state.expanded) {
            dropdown = (
                <EntityDropdownList
                    matchKey={this.props.matchKey}
                    scope={this.props.scope}
                    value={this.props.value}
                    options={this.props.options}
                    clickedItem={this.clickedItem} />
            );
        }

        let disabled = '';
        if (!this.props.enabled) {
            disabled = 'disabled';
        }

        return (
            <div className="geo-entity-item">
                <label
                    className={`location-label ${disabled}`}
                    htmlFor={`${this.props.scope}-autocomplete`}>
                    {this.props.title}
                    <div
                        id={`${this.props.scope}-autocomplete`}
                        className={`geo-entity-dropdown ${disabled}`}
                        onMouseOver={this.mouseEnter}
                        onFocus={this.mouseEnter}
                        onMouseOut={this.mouseLeave}
                        onBlur={this.mouseLeave}
                        tabIndex={-1}
                        ref={(div) => {
                            this.wrapperDiv = div;
                        }}>
                        <input
                            disabled={!this.props.enabled}
                            type="text"
                            value={this.props.searchString}
                            onChange={this.onChange.bind(this)}
                            placeholder={this.props.placeholder} />
                        {dropdown}
                    </div>
                </label>
            </div>
        );
    }
}

EntityDropdownAutocomplete.propTypes = propTypes;
EntityDropdownAutocomplete.defaultProps = defaultProps;
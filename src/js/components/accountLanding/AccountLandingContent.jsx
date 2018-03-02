/**
 * AccountLandingContent.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/sharedComponents/Pagination';
import AccountLandingSearchBar from './AccountLandingSearchBar';
import AccountLandingResultsSection from './AccountLandingResultsSection';

const propTypes = {
    results: PropTypes.array,
    accountSearchString: PropTypes.string,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    columns: PropTypes.array,
    setAccountSearchString: PropTypes.func,
    onChangePage: PropTypes.func,
    pageNumber: PropTypes.number,
    totalItems: PropTypes.number,
    pageSize: PropTypes.number,
    order: PropTypes.object,
    updateSort: PropTypes.func
};

export default class AccountLandingContent extends React.Component {
    render() {
        return (
            <div className="landing-page">
                <div className="landing-page__overview">
                    <h2 className="landing-page__title">
                        Find a Federal Account Profile.
                    </h2>
                    <h3 className="landing-page__subtitle">
                        Explore spending in greater detail in our federal account profiles.
                    </h3>
                    <p>
                        The government has more than 2,000 unique federal accounts, which are similar to bank accounts. Use our Federal Account Profiles to get a better understanding of how agencies receive and spend congressional funding to carry out their programs, projects, and activities.
                    </p>
                </div>
                <AccountLandingSearchBar
                    setAccountSearchString={this.props.setAccountSearchString} />
                <Pagination
                    onChangePage={this.props.onChangePage}
                    pageNumber={this.props.pageNumber}
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize} />
                <AccountLandingResultsSection
                    columns={this.props.columns}
                    results={this.props.results}
                    inFlight={this.props.inFlight}
                    error={this.props.error}
                    accountSearchString={this.props.accountSearchString}
                    order={this.props.order}
                    updateSort={this.props.updateSort} />
                <Pagination
                    onChangePage={this.props.onChangePage}
                    pageNumber={this.props.pageNumber}
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize} />
            </div>
        );
    }
}

AccountLandingContent.propTypes = propTypes;
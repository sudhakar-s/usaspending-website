/**
 * Award.jsx
 * Created by David Trinh 10/5/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import { find } from 'lodash';
import { scrollToY } from 'helpers/scrollToHelper';

import SummaryBar from './SummaryBarV2';
import ContractContent from './contract/ContractContent';
import FinancialAssitanceContent from './financialAssistance/FinancialAssistanceContent';
import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import Error from '../sharedComponents/Error';

const propTypes = {
    award: PropTypes.object,
    noAward: PropTypes.bool,
    inFlight: PropTypes.bool,
    id: PropTypes.string
};

const awardSections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'additional-information',
        label: 'Additional Information'
    }
];

export default class Award extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sectionPositions: [],
            window: {
                height: 0
            }
        };

        this.jumpToSection = this.jumpToSection.bind(this);
    }

    jumpToSection(section = '') {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = find(awardSections, {
            section
        });

        if (!matchedSection) {
            // no matching section
            return;
        }

        // scroll to the correct section
        const sectionDom = document.querySelector(`#award-${section}`);

        if (!sectionDom) {
            return;
        }

        const sectionTop = sectionDom.offsetTop - 145;
        scrollToY(sectionTop, 700);
    }
    render() {
        let content = null;
        let summaryBar = null;
        const award = this.props.award.selectedAward;
        if (award) {
            summaryBar = (
                <SummaryBar
                    selectedAward={this.props.award.selectedAward} />
            );
            if (award.category === "contract") {
                content = (
                    <ContractContent
                        {...this.props}
                        sections={awardSections}
                        jumpToSection={this.jumpToSection}
                        inFlight={this.props.inFlight}
                        selectedAward={this.props.award.selectedAward} />
                );
            }
            else {
                content = (
                    <FinancialAssitanceContent
                        {...this.props}
                        inFlight={this.props.inFlight}
                        selectedAward={this.props.award.selectedAward} />
                );
            }
        }
        if (this.props.noAward) {
            content = (
                <div className="wrapper">
                    <Error
                        title="Invalid Award ID"
                        message="The award ID provided is invalid.
                        Please check the ID and try again." />
                </div>
            );
        }
        return (
            <div className="usa-da-award-v2-page">
                <MetaTags {...MetaTagHelper.awardPageMetaTags} />
                <Header />
                <StickyHeader>
                    {summaryBar}
                </StickyHeader>
                <main className={!this.props.noAward ? "award-content" : ""}>
                    {content}
                </main>
                <Footer />
            </div>
        );
    }
}

Award.propTypes = propTypes;

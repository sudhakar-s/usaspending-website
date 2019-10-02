import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.oneOf(["naics", "psc"]),
    data: PropTypes.shape({})
};

const parentMargin = 14;

const LineTree = ({
    type,
    data
}) => {
    const initialState = Object.keys(data).reduce((acc, tierType) => ({ ...acc, [tierType]: '0px' }), {});
    const [lineHeightByTierType, setLineHeightsByTierType] = useState(initialState);
    const parentRef = useRef('');
    const pscServicesRef = useRef('');
    const topTierRef = useRef('');
    const baseTierRef = useRef('');
    const subTierRef = useRef('');
    const midTierRef = useRef('');

    const refsByTierType = {
        additionalDataForPsc: pscServicesRef,
        midtier_code: midTierRef,
        toptier_code: topTierRef,
        subtier_code: subTierRef,
        basetier_code: baseTierRef
    };

    const getHeight = useCallback((tierType) => {
        const refForTier = refsByTierType[tierType];
        if (refForTier) {
            const coordinateToBottomOfListItem = refForTier.current.getBoundingClientRect().bottom;
            const coordinateToBottomOfParent = parentRef.current.getBoundingClientRect().bottom;
            // console.log(`For ${type} on line for ${tierType} *** ${coordinateToBottomOfListItem}, ${coordinateToBottomOfParent}`);
            const appropriateHeight = coordinateToBottomOfParent - coordinateToBottomOfListItem;
            return `${appropriateHeight}px`;
        }
        return '0px';
    }, [refsByTierType]);

    useEffect(() => {
        // For each tier type, calculate the height
        const newState = Object.keys(data)
            .filter((tierType) => Object.keys(data[tierType]).length > 0)
            .reduce((acc, tierType) => ({
                ...acc,
                [tierType]: getHeight(tierType)
            }), {});
        setLineHeightsByTierType(newState);
    }, [data, type, getHeight]);

    const handleSort = (a, b, source = data) => {
        const first = source[a].code;
        const second = source[b].code;
        if (first === 'SERVICES') return -1;
        if (second === 'SERVICES') return 1;
        if ((first.length === 2) || (first.length === 4 && second.length === 6)) {
            return -1;
        }
        if ((second.length === 2) || (second.length === 4 && first.length === 6)) {
            return 1;
        }
        return 0;
    };

    return (
        <ul ref={parentRef} style={{ margin: `${parentMargin}px 0px` }} className={`line-tree-${type}`}>
            {Object.keys(data)
                .filter((tierType) => Object.keys(data[tierType]).includes('code') && Object.keys(data[tierType]).includes('description'))
                .sort(handleSort)
                .map((tierType, index, arr) => {
                    const showLine = (arr.length - 1) > index;
                    const ref = refsByTierType[tierType];
                    return (
                        <li ref={ref} className={`line-tree__${tierType}`}>
                            <span>{`${data[tierType].code}: `}</span>
                            <span>{`${data[tierType].description}`}</span>
                            {showLine && (
                                <div style={{ height: lineHeightByTierType[tierType] }} className="line-tree__line" />
                            )}
                        </li>
                    );
                })
            }
        </ul>
    );
};

LineTree.propTypes = propTypes;
export default LineTree;
/**
 * StickyHeader.jsx
 * Created by Mike Bray 02/02/2018
 **/

import React, { useState, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node
};

export const stickyHeaderHeight = 66;

export const useDynamicStickyClass = (stickyRef, fixedStickyBreakpoint = null) => {
    const [dynamicStickyBreakpoint, setDynamicStickyBreakpoint] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    return [
        isSticky,
        // scrollPosition at which we apply the sticky-icky
        dynamicStickyBreakpoint,
        // setSticky
        setIsSticky,
        // handleScroll
        () => {
            const { scrollY } = window;
            if (fixedStickyBreakpoint && scrollY >= fixedStickyBreakpoint && !isSticky) {
                // we know which y position to apply the sticky class
                setIsSticky(true);
            }
            else if (!fixedStickyBreakpoint && scrollY >= dynamicStickyBreakpoint && !isSticky) {
                // we don't know which y position to apply the sticky class
                setIsSticky(true);
            }
            else if (scrollY < fixedStickyBreakpoint && isSticky) {
                setIsSticky(false);
            }
            else if (scrollY < dynamicStickyBreakpoint && isSticky) {
                setIsSticky(false);
            }
        },
        // measureScreen
        () => {
            const wrapperY = stickyRef.current
                ? stickyRef.current.offsetTop
                : 0;
            setDynamicStickyBreakpoint(wrapperY);
        }
    ];
};

const stickyHeader = createRef();

const StickyHeader = ({
    children
}) => {
    const [
        isSticky,
        ,
        ,
        handleScroll,
        measureScreen
    ] = useDynamicStickyClass(stickyHeader);

    useEffect(() => {
        measureScreen();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', measureScreen);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', measureScreen);
        };
    }, [handleScroll, measureScreen]);

    const stickyClass = isSticky ? 'sticky-header__container_sticky' : '';

    return (
        <div className="sticky-header" ref={stickyHeader}>
            <div className={`sticky-header__container ${stickyClass}`}>
                <div className="sticky-header__header" aria-labelledby="main-focus">
                    {children}
                </div>
            </div>
        </div>
    );
};

StickyHeader.propTypes = propTypes;

export default StickyHeader;

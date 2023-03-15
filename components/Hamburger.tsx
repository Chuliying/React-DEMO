import React from 'react'
import styles from './Hamburger.module.scss'

const Hamburger = (props: { menuState: boolean }) => {
    const { menuState } = props;
    return (
        <div
            id={styles.hamburger}
            className={menuState ? "open" : ''}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default Hamburger
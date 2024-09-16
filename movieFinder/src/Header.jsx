import React from "react";
import styles from "./bubble.module.css";

const Header = () => {

    return (
        <>
            <div className="text-center border-b border-neutral-100">
                <h2 className="text-center text-7xl font-light text-indigo-300 ">
                    {"Movie Finder".split("").map((child, idx) => (
                        <span className={styles.hoverText} key={idx}>
                            {child}
                        </span>
                    ))}
                </h2>
            </div>
        </>
    )
}

export default Header
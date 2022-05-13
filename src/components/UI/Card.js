import React from "react";
import styles from "./Card.module.css";

const Card = (props) => {
	return (
		<div className={`xsm:bg-red-300 ${styles.card} ${props.className}`}>
			{props.children}
		</div>
	);
};

export default Card;

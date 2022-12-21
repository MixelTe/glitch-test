import React from "react"
import coolAnim from "../../../coolAnim"
import styles from "./styles.module.css"
import icon from "./Vector.svg"
import icon1 from "./Vector1.svg"

export default function Card({ name })
{
	return <div className={styles.root}>
		<div className={styles.title} ref={coolAnim()}>
			<span data-t className={styles.te} ref={coolAnim()}>{name}</span>
			<img className={styles.te} data-ac src={icon1} alt="tg" ref={coolAnim()} />
			<img className={styles.te} data-ac src={icon} alt="gh" ref={coolAnim()} />
		</div>
		<div data-t className={styles.desc} ref={coolAnim()}>Рассказ о себе. Lorem ipsum dolor amet consectetur. Duis sed velit libero urna vivamus sem sit. Ut consequat tempus enim ac ullamcorper.</div>
		<div data-t data-ac className={styles.tech} ref={coolAnim()}>HTML, CSS, JavaScript, React</div>
	</div>
}

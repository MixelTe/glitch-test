import React from "react"
import coolAnim from "../../coolAnim"
import Card from "./Card"
import styles from "./styles.module.css"

export default function HeroBlock()
{
	return <div className={styles.root}>
		<h2 data-t className={styles.t} ref={coolAnim()}>Наша команда</h2>
		<ul>
			<li><Card name="Влад" /></li>
			<li><Card name="Николай" /></li>
			<li><Card name="Михаил" /></li>
			<li><Card name="Дарья" /></li>
		</ul>
	</div>
}

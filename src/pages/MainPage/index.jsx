import React from "react"
import Button from "../../components/Button"
import HeroBlock from "../../components/HeroBlock"
import MapBlock from "../../components/MapBlock"
import styles from "./styles.module.css"

export default function MainPage()
{
	return <div className={styles.root}>
		<HeroBlock />
		<Button />
		<MapBlock/>
	</div>
}

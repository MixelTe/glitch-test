import React from "react"
import { NavLink } from "react-router-dom"
import styles from "./styles.module.css"

export default function Header()
{
	return <div className={styles.root}>
		<NavLink data-ac data-t className={({ isActive }) => isActive ? styles.active : styles.link} to={"/"}>Первая страница</NavLink>
		<div data-ac className={styles.a1}></div>
		<div className={styles.a2}>
			<NavLink data-t className={({ isActive }) => isActive ? styles.active : styles.link} to={"/projects"}>Вторая страница</NavLink>
		</div>
	</div>
}


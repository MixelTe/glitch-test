import React from "react"
import styles from "./styles.module.css"
import map from "./map.png"
import coolAnim from "../../coolAnim"

export default function MapBlock()
{
	return <div className={styles.root}>
		<h2 data-t data-ac ref={coolAnim()} className={styles.t}>Контактная информация</h2>
		<ul>
			<li>
				<h3 data-t data-ac ref={coolAnim()} className={styles.n}>Влад</h3>
				<ul>
					<li data-t ref={coolAnim()} className={styles.d}>г. Москва, Ленинский пр-т, 10</li>
					<li data-t ref={coolAnim()} className={styles.d}>г. Москва, ул. Большая Пушкинская, стр. 10</li>
				</ul>
			</li>
			<li>
				<h3 data-t data-ac ref={coolAnim()} className={styles.n}>Николай</h3>
				<ul>
					<li data-t ref={coolAnim()} className={styles.d}>ул. Молодогвардейцев, 18, Воронеж, Воронежская обл.</li>
					<li data-t ref={coolAnim()} className={styles.d}>ул. Героев Сибиряков, 13, Воронеж, Воронежская обл.</li>
				</ul>
			</li>
			<li>
				<h3 data-t data-ac ref={coolAnim()} className={styles.n}>Михаил</h3>
				<ul>
					<li data-t ref={coolAnim()} className={styles.d}>Мещерский парк</li>
					<li data-t ref={coolAnim()} className={styles.d}>Останкинская телебашня</li>
				</ul>
			</li>
			<li>
				<h3 data-t data-ac ref={coolAnim()} className={styles.n}>Дарья</h3>
				<ul>
					<li data-t ref={coolAnim()} className={styles.d}>Нижняя Радищевская улица, 5с2</li>
					<li data-t ref={coolAnim()} className={styles.d}>Красная площадь, 1</li>
				</ul>
			</li>
		</ul>
		<img data-ac src={"https://web-site-qjo5.onrender.com/image/avatar_5.png"} alt="Map" />
	</div>
}

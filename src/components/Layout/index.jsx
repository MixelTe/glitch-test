import Footer from "../Footer"
import Header from "../Header"
import styles from "./styles.module.css"

export default function Layout({ children })
{
	return <div className={styles.root}>
		<Header />
		{children}
		<Footer />
	</div>
}

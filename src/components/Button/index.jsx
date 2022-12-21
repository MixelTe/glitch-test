import React from "react"
import styles from "./styles.module.css"
import img from "./avatar.jpg"
import I_hg from "./Dark_gh-logo.svg"
import I_tg from "./TG-logo.svg"

export default function Button()
{
	return <div className={styles.root}>
		<div className={styles.btn1}>
			<button data-t data-ac className={styles.btn} onClick={dpr}>Не нажимать!</button>
			<div className={styles.cover} onClick={e => e.target.classList.toggle(styles.act)}></div>
		</div>
		<button data-t data-ac className={styles.btn} onClick={pr}>Нажимать!</button>
	</div>
}

let dpr_a = false;
function dpr()
{
	if (dpr_a) return;
	dpr_a = true;
	const els = document.body.querySelectorAll("*:not(#root):not(#root > div)");
	const rects = []
	for (let i = 0; i < els.length; i++)
	{
		const el = els[i];
		rects.push(el.getBoundingClientRect());
		let x = rects[i].left;
		let y = rects[i].top;
		let dy = 0;
		setTimeout(() =>
		{
			document.body.appendChild(el);
			el.setAttribute("data-da", true);
			el.style.position = "fixed";
			el.style.left = `${x}px`;
			el.style.top = `${y}px`;
			el.style.width = `${rects[i].width}px`;
			el.style.height = `${rects[i].height}px`;
			el.style.transition = "transform";
			el.style.transitionDuration = "100ms";

		}, 1);
		setTimeout(() =>
		{
			el.style.left = `${x}px`;
			el.style.top = `${y}px`;
			let r = Math.floor(Math.random() * 10) - 5;
			el.style.transform = `rotate(${r}deg)`;
			el.style.transformOrign = Math.random() > 0.5 ? "top left" : "top right";

			setTimeout(() =>
			{
				let w = 0;
				const h = setInterval(() =>
				{
					w += 1;
					dy += 0.2;
					y += dy;
					el.style.top = `${y}px`;
					if (r > 0) r += 0.6;
					else r -= 0.6;
					el.style.transform = `rotate(${r}deg)`;
					if (w > 250)
						clearInterval(h);

				}, 25);
			}, Math.floor(Math.random() * 800) + 400);
		}, Math.floor(Math.random() * 1600) + 600);
	}
}

function pr()
{
	if (dpr_a) return;
	dpr_a = true;
	const w = window.innerWidth;
	const h = window.innerHeight;
	const els = document.body.querySelectorAll("[data-t]");
	const letters = [];
	for (let i = 0; i < els.length; i++)
	{
		const el = els[i];
		// el.style.color = "transparent";
		const t = el.innerText;
		el.innerHTML = ""
		const s = getComputedStyle(el);
		for (let j = 0; j < t.length; j++)
		{
			const l = t[j];
			const ch = document.createElement("span");
			ch.innerText = l;
			ch.style.color = s.color;
			ch.style.fontSize = s.fontSize;
			el.appendChild(ch);
			letters.push(ch);
		}
	}
	sf();
	const b = document.createElement("div");
	b.style.backgroundColor = "transparent";
	b.style.position = "fixed";
	b.style.top = "0";
	b.style.left = "0";
	b.style.width = "100%";
	b.style.height = "100%";
	b.style.zIndex = "100";
	b.style.transition = "background-color";
	b.style.transitionDuration = "500ms";
	document.body.appendChild(b);
	setTimeout(() =>
	{
		b.style.backgroundColor = "black";
	}, 1);

		const t = "Автор сего ШЕДЕВРА";
	setTimeout(() =>
	{
	for (let i = 0; i < letters.length; i++)
	{
		const ch = letters[i];
		const p = [];
		for (let j = 0; j < t.length; j++)
		{
			if (ch.innerText.toLowerCase() === t[j].toLowerCase())
				p.push(j);
		}
		let X = 0;
		let Y = 0;
		let v = 0;
		if (p.length > 0)
		{
			v = p[Math.floor(Math.random() * p.length)];
			Y = (h - 100) / 2 - 90;
			X = (w - 100) / 2 + v * 15 - 120;
		}
		else
		{
			Y = Math.sin(i / 15) * (150 + 100 * (i / 100) / (2 * Math.PI)) + (h - 100) / 2;
			X = Math.cos(i / 15) * (150 + 100 * (i / 100) / (2 * Math.PI)) + (w - 100) / 2;
		}

		ch.style.transition = "left, top";
		ch.style.zIndex = "100000";
		ch.style.transitionDuration = "500ms";
		setTimeout(() =>
		{
			ch.style.left = `${X}px`;
			ch.style.top = `${Y}px`;
			if (p.length > 0)
			{
				ch.style.fontFamily = "Arial";
				ch.style.fontSize = "16px";
				ch.innerText = t[v];
			}
		}, Math.floor(Math.random() * 100) + 1050);
	}
	}, 10)
	function crI(src, x, y, W, H, href)
	{
		const a = document.createElement("a");
		if (href) a.href = href;
		const img = document.createElement("img");
		a.appendChild(img);
		img.style.width = "100%";
		img.style.height = "100%";
		img.src = src;
		a.style.position = "fixed";
		a.style.top = `${(h - 100) / 2 + y}px`;
		a.style.left = `${(w - 100) / 2 + x}px`;
		a.style.width = `${W}px`;
		a.style.height = `${H}px`;
		a.style.zIndex = "101";
		a.style.transition = "opacity";
		a.style.transitionDuration = "500ms";
		img.style.borderRadius = "20px";
		a.style.opacity = "0";
		if (href)
		{
			a.target = "_blank";
			a.setAttribute("data-ac", "true");
			img.setAttribute("data-ac", "true");
		}
		document.body.appendChild(a);
		setTimeout(() =>
		{
			a.style.opacity = "1";
		}, Math.floor(Math.random() * 100) + 10);
	}
	setTimeout(() =>
	{
		crI(img, -60, -50, 120, 120);
		crI(I_hg, -90, 80, 50, 50, "https://github.com/MixelTe");
		crI(I_tg, 40, 80, 50, 50, "https://telegram.me/MixelTe");
	}, 1300);
}

function sf()
{
	const els = document.body.querySelectorAll("*:not(#root):not(#root > div)");
	const rects = []
	for (let i = 0; i < els.length; i++)
	{
		const el = els[i];
		rects.push(el.getBoundingClientRect());
		let x = rects[i].left;
		let y = rects[i].top;
		setTimeout(() =>
		{
			document.body.appendChild(el);
			el.setAttribute("data-da", true);
			el.style.position = "fixed";
			el.style.left = `${x}px`;
			el.style.top = `${y}px`;
			el.style.width = `${rects[i].width}px`;
			el.style.height = `${rects[i].height}px`;
			el.style.transition = "transform";
			el.style.transitionDuration = "100ms";
		}, 1);
	}
}

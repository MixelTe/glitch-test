export default function coolAnim(el)
{
	const o = { current: null };
	const m = Math.random() * 1 - 0.5;
	const d = Math.random() * 70 + 10;
	window.addEventListener("scroll", e =>
	{
		if (!o.current) return;
		if (o.current.getAttribute("data-da")) return;
		if (o.current.parentElement.id !== "coolAnim")
		{
			const el = o.current.cloneNode(true);
			const el2 = o.current.cloneNode(true);
			el.id = "coolAnim";
			el.style.position = "relative";
			el.style.display = "inline-block";
			el.innerHTML = "";
			const p = o.current.parentElement;
			p.insertBefore(el, o.current);
			el.appendChild(el2);
			el.appendChild(o.current);
			el2.style.margin = "0";
			el2.style.opacity = "0";
			el2.removeAttribute("data-t");
			el.removeAttribute("data-t");
		}
		o.current.style.margin = "0";
		o.current.style.position = "absolute";
		o.current.style.top = `${window.scrollY * m % d}px`;
		o.current.style.left = `0px`;
		o.current.style.height = `100%`;
		o.current.style.zIndex = `10`;
	});
	return o;
}

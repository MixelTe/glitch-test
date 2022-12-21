export default function StartAnim()
{
	const c = document.createElement("div");
	c.style.position = "fixed";
	c.style.top = `${-10}px`;
	c.style.left = `${-10}px`;
	c.style.width = `${1}px`;
	c.style.height = `${1}px`;
	c.style.border = `4px solid red`;
	c.style.zIndex = `99999`;
	c.style.borderRadius = "50%";
	c.style.pointerEvents = "none";
	c.style.transform = `translate(-50%, -50%) scale(1)`;
	c.style.transition = "width, height, border";
	c.style.transitionDuration = "250ms";
	c.style.boxShadow = "0 0 6px 3px blue";
	document.body.appendChild(c);
	let ac = false;

	window.addEventListener("mousemove", e =>
	{
		const x = e.clientX;
		const y = e.clientY;
		c.style.top = `${y}px`;
		c.style.left = `${x}px`;
		if (e.target?.getAttribute?.("data-ac"))
		{
			c.style.transitionTimingFunction = "cubic-bezier(0.000, 0.450, 0.605, 3.650)";
			c.style.transition = "width, height, border";
			c.style.transitionDuration = "250ms";
			c.style.width = `${20}px`;
			c.style.height = `${20}px`;
			c.style.border = `2px solid red`;
			if (!ac) burst(x, y);
			ac = true;
		}
		else
		{
			ac = false;
			c.style.width = `${1}px`;
			c.style.height = `${1}px`;
			c.style.border = `4px solid red`;
		}
		const el = document.createElement("div");
		el.style.position = "fixed";
		el.style.top = `${y}px`;
		el.style.left = `${x}px`;
		const s = Math.random() * 10 + 10;
		el.style.width = `${s}px`;
		el.style.height = `${s}px`;
		el.style.transform = `translate(-50%, -50%) scale(1)`;
		el.style.transition = "transform";
		el.style.transitionDuration = "500ms";
		el.style.transitionTimingFunction = "cubic-bezier(1.000, -0.600, 0.475, 1.035)";
		el.style.borderRadius = "50%";
		el.style.pointerEvents = "none";
		el.style.backgroundColor = color(0.5);
		document.body.appendChild(el);
		setTimeout(() => el.style.transform = `translate(-50%, -50%) scale(0)`, 1);
		setTimeout(() => document.body.removeChild(el), 1500);
	});
	window.addEventListener("click", e =>
	{
		const x = e.clientX;
		const y = e.clientY;
		c.style.transitionTimingFunction = "cubic-bezier(0.000, 0.450, 0.605, 3.650)";
		c.style.width = `${10}px`;
		c.style.height = `${10}px`;
		c.style.border = `2px solid red`;
		setTimeout(() =>
		{
			if (ac)
			{
				c.style.transitionTimingFunction = "cubic-bezier(0.000, 0.450, 0.605, 3.650)";
				c.style.width = `${20}px`;
				c.style.height = `${20}px`;
				c.style.border = `2px solid red`;
			}
			else
			{
				c.style.width = `${1}px`;
				c.style.height = `${1}px`;
				c.style.border = `4px solid red`;
			}
		}, 150);
		burst(x, y);
	});
}

function color(a)
{
	const c = () => Math.floor(Math.random() * 255);
	return `rgba(${c()}, ${c()}, ${c()}, ${a})`;
}

function burst(x, y)
{
	for (let i = 0; i < 20; i++)
	{
		const el = document.createElement("div");
		el.style.position = "fixed";
		el.style.top = `${y}px`;
		el.style.left = `${x}px`;
		el.style.width = "5px";
		el.style.height = "5px";
		el.style.borderRadius = "50%";
		el.style.zIndex = "10";
		el.style.pointerEvents = "none";
		el.style.backgroundColor = color(0.8);
		document.body.appendChild(el);
		const dx = Math.random() * 3 - 1.5;
		let dy = Math.random() * -4 - 8;
		let X = x;
		let Y = y;
		let w = 0;
		const h = setInterval(() =>
		{
			X += dx;
			Y += dy;
			w += 1;
			dy += 0.4;
			el.style.top = `${Y}px`;
			el.style.left = `${X}px`;
			if (w > 250)
			{
				clearInterval(h);
				document.body.removeChild(el);
			}
		}, 20);
	}
}

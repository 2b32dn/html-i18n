async function loadMenu() {
	try {
		const response = await fetch("http://localhost:3000/menu");
		if (!response.ok) throw new Error("Network response was not ok");

		const menuItems = await response.json();
		const menuList = document.getElementById("menu-list");
		menuList.innerHTML = ""; // Clear any existing content

		menuItems.forEach((item) => {
			const li = document.createElement("li");

			li.setAttribute("data-i18n", `${item["menu_title_code"]}`);
			li.innerHTML = `${item.menu_name} $${item.menu_price}<br>${item.menu_description}`;
			menuList.appendChild(li);

			const div = document.createElement("div");
			div.setAttribute("data-i18n", `${item.menu_description_code}`);
			menuList.appendChild(div);
		});
	} catch (error) {
		console.error("Error fetching menu:", error);
	}
}

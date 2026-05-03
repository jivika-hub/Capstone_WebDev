// Fake database
const items = [
    {
        title: "AirPods Case",
        description: "Found near library benches",
        location: "Library",
        status: "found",
        image: "https://peeperly.in/cdn/shop/files/202602231042183401_airpodscase_1_1080x.webp?v=1775300581"
    },
    {
        title: "Water Bottle",
        description: "Lost in cafeteria area",
        location: "Cafeteria",
        status: "lost",
        image: "https://pexpo.in/cdn/shop/files/ELECTRO_Silver_433e777a-4d46-4049-88a1-1b2f8b8f11fc.jpg?v=1767698911"
    },
    {
        title: "Car Keys",
        description: "Keys with blue lanyard",
        location: "Main Gate",
        status: "found",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
    }
];

// Simulate API using Promise
function fetchItems() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(items);
        }, 500);
    });
}

// Render items
function renderItems(data) {
    const container = document.getElementById("itemsContainer");
    container.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.image}" />
            <div class="card-body">
                <span class="tag ${item.status}">
                    ${item.status === "found" ? "Found" : "Lost"}
                </span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <small>${item.location}</small>
            </div>
        `;

        container.appendChild(card);
    });
}

// Filter items
function filterItems(type, allItems) {
    if (type === "all") return allItems;
    return allItems.filter(item => item.status === type);
}

// Handle sidebar clicks
function setupFilters(allItems) {
    const buttons = document.querySelectorAll(".item");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            // Active UI change
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            const filtered = filterItems(filter, allItems);
            renderItems(filtered);
        });
    });
}

// Init app
fetchItems().then(data => {
    renderItems(data);
    setupFilters(data);
});
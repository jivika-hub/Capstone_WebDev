//  SELECT GRID
const grid = document.querySelector(".grid");

// LOAD ITEMS FROM FLASK
async function loadItems(filter = "all") {
    try {
        const res = await fetch("http://127.0.0.1:5000/items");
        const data = await res.json();

        grid.innerHTML = "";

        data.forEach(item => {

            // Apply filter
            if (filter !== "all" && item.status !== filter) return;

            const imageUrl = item.image && item.image.startsWith("http")
                ? item.image
                : "https://via.placeholder.com/150";

            const card = `
            <div class="card">
                <img src="${imageUrl}">
                <div class="card-body">
                    <span class="tag ${item.status}">${item.status}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <small>${item.location}</small>
                </div>
            </div>
            `;

            grid.innerHTML += card;
        });

    } catch (err) {
        console.error("Error loading items:", err);
    }
}

//  ADD ITEM USING FLASK
async function addItem() {
    const title = prompt("Enter title:");
    const description = prompt("Enter description:");
    const location = prompt("Enter location:");
    const status = prompt("lost or found:").toLowerCase();
    const image = prompt("Enter image URL:");

    if (!image.startsWith("http")) {
        alert("Enter valid image URL");
        return;
    }

    try {
        await fetch("http://127.0.0.1:5000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description,
                location,
                status,
                image
            })
        });

        loadItems();

    } catch (err) {
        console.error("Error adding item:", err);
    }
}

//  BUTTON EVENTS
document.getElementById("addBtn").addEventListener("click", addItem);
document.getElementById("navAdd").addEventListener("click", addItem);

//  FILTER BUTTONS
document.getElementById("filterAll").addEventListener("click", () => loadItems("all"));
document.getElementById("filterLost").addEventListener("click", () => loadItems("lost"));
document.getElementById("filterFound").addEventListener("click", () => loadItems("found"));

//  INITIAL LOAD
loadItems();

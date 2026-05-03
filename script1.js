// CONNECTING TO SUPABASE
const SUPABASE_URL = "https://mlqzjzqxgvooirgcuubm.supabase.co";
const SUPABASE_KEY = "sb_publishable_FX5C79EUIeF3VDOfJxpVqQ_NH67Gn6K";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 📦 SELECT GRID
const grid = document.querySelector(".grid");

// LOAD DATA FROM DATABASE
async function loadItems() {
    const { data, error } = await client
        .from('items')
        .select('*');

    if (error) {
        console.error(error);
        return;
    }

    grid.innerHTML = "";

    data.forEach(item => {
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
}

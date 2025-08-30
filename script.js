// Tab switching
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Status message
function showStatus(msg) {
  const status = document.getElementById("status-message");
  status.textContent = msg;
  status.style.display = "block";
  setTimeout(() => status.style.display = "none", 1500);
}

// Items
let items = [];

document.getElementById("addItemBtn").addEventListener("click", () => {
  const name = document.getElementById("itemName").value;
  const location = document.getElementById("itemLocation").value;
  const note = document.getElementById("itemNote").value;
  const imageInput = document.getElementById("itemImage").files[0];

  if (!name) return alert("Enter item name!");

  const item = {
    name,
    location,
    note,
    category: location || "",
    image: imageInput ? URL.createObjectURL(imageInput) : ""
  };

  items.push(item);
  renderItems();
  showStatus("Added item!");

  // Clear fields
  document.getElementById("itemName").value = "";
  document.getElementById("itemLocation").value = "";
  document.getElementById("itemNote").value = "";
  document.getElementById("itemImage").value = "";
});

// Render items
function renderItems() {
  const list = document.getElementById("items-list");
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filter = document.getElementById("categoryFilter").value;

  list.innerHTML = "";
  items
    .filter(i => i.name.toLowerCase().includes(search) &&
      (filter === "" || i.category === filter))
    .forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        ${item.image ? `<img src="${item.image}" alt="item">` : ""}
        <div>
          <strong>${item.name}</strong><br>
          ${item.location}<br>
          <small>${item.note}</small>
        </div>
      `;
      // Edit item on click
      div.addEventListener("click", () => {
        const newName = prompt("Edit name:", item.name);
        if (newName !== null) item.name = newName;

        const newLocation = prompt("Edit location:", item.location);
        if (newLocation !== null) item.location = newLocation;

        const newNote = prompt("Edit note:", item.note);
        if (newNote !== null) item.note = newNote;

        renderItems();
        showStatus("Edited item!");
      });
      list.appendChild(div);
    });
}

// Search + filter
document.getElementById("searchInput").addEventListener("input", renderItems);
document.getElementById("categoryFilter").addEventListener("change", renderItems);

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Switch pages
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

// Show temporary message
function showMessage(text) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
  }, 1500);
}

// Items storage
let items = [];

document.getElementById("addForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("itemName").value;
  const location = document.getElementById("itemLocation").value;
  const note = document.getElementById("itemNote").value;
  const imageInput = document.getElementById("imageInput");
  let imageURL = "";

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(event) {
      imageURL = event.target.result;
      addItem(name, location, note, imageURL);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    addItem(name, location, note, "");
  }

  this.reset();
});

function addItem(name, location, note, imageURL) {
  const newItem = { name, location, note, imageURL };
  items.push(newItem);
  renderItems();
  showMessage("Added Item!");
}

function renderItems() {
  const list = document.getElementById("items-list");
  list.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item-card";
    div.innerHTML = `
      ${item.imageURL ? `<img src="${item.imageURL}" width="100"/>` : ""}
      <p><b>${item.name}</b></p>
      <p>📍 ${item.location}</p>
      <p>📝 ${item.note}</p>
    `;
    list.appendChild(div);
  });
}

function searchItems() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query) ||
    item.note.toLowerCase().includes(query)
  );

  const list = document.getElementById("items-list");
  list.innerHTML = "";
  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "item-card";
    div.innerHTML = `
      ${item.imageURL ? `<img src="${item.imageURL}" width="100"/>` : ""}
      <p><b>${item.name}</b></p>
      <p>📍 ${item.location}</p>
      <p>📝 ${item.note}</p>
    `;
    list.appendChild(div);
  });
}

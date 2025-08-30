document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("nav button");
  const sections = document.querySelectorAll(".tab");
  const addItemBtn = document.getElementById("addItemBtn");
  const itemsList = document.getElementById("itemsList");
  const notification = document.getElementById("notification");

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      sections.forEach(sec => sec.classList.remove("active"));
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  addItemBtn.addEventListener("click", () => {
    const name = document.getElementById("itemName").value;
    const location = document.getElementById("itemLocation").value;
    const note = document.getElementById("itemNote").value;
    const imageFile = document.getElementById("itemImage").files[0];

    if (!name) return;

    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    if (imageFile) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(imageFile);
      itemDiv.appendChild(img);
    }

    const details = document.createElement("div");
    details.innerHTML = `<strong>${name}</strong><br>${location}<br>${note}`;
    itemDiv.appendChild(details);

    itemsList.appendChild(itemDiv);
    showNotification("Added item!");

    document.getElementById("itemName").value = "";
    document.getElementById("itemLocation").value = "";
    document.getElementById("itemNote").value = "";
    document.getElementById("itemImage").value = "";
  });

  document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  function showNotification(msg) {
    notification.textContent = msg;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 1000);
  }
});

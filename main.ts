declare const confetti: any;

interface GroceryItem {
  task: string;
  done: boolean;
}

let groceries: GroceryItem[] = [];
let lastRemoved: GroceryItem | null = null;

// Load from localStorage
const savedList = localStorage.getItem("groceries");
if (savedList) {
  groceries = JSON.parse(savedList);
}

function saveGroceries(): void {
  localStorage.setItem("groceries", JSON.stringify(groceries));
}

function showGroceries(): void {
  const list = document.getElementById("foodList") as HTMLUListElement;
  list.innerHTML = "";

  const sorted = [...groceries].sort((a, b) => Number(a.done) - Number(b.done));

  sorted.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.task + (item.done ? " ✅" : "");

    if (item.done) {
      li.classList.add("checked");
    }

    li.onclick = () => {
      if (!item.done) {
        const original = groceries.find(g => g.task === item.task && !g.done);
        if (original) original.done = true;
      } else {
        const index = groceries.findIndex(g => g.task === item.task && g.done);
        if (index !== -1) {
          lastRemoved = groceries[index];
          groceries.splice(index, 1);
        }
      }

      saveGroceries();
      showGroceries();
    };

    list.appendChild(li);
  });

  // 🎉 Confetti when all done
  if (groceries.length > 0 && groceries.every(item => item.done)) {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });
  }
}

// Handle adding new items
document.getElementById("addItemForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("newItem") as HTMLInputElement | null;
  if (!input) return;

  const newItemText = input.value.trim();
  if (newItemText !== "") {
    groceries.push({ task: newItemText, done: false });
    input.value = "";
    saveGroceries();
    showGroceries();
  }
});

// Clear all
document.getElementById("clearButton")?.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the list?")) {
    groceries = [];
    lastRemoved = null;
    saveGroceries();
    showGroceries();
  }
});

// Undo last removal
document.getElementById("undoButton")?.addEventListener("click", () => {
  if (lastRemoved) {
    groceries.push(lastRemoved);
    lastRemoved = null;
    saveGroceries();
    showGroceries();
  } else {
    alert("Nothing to undo!");
  }
});

showGroceries();

// Service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    console.log('Service Worker Registered');
  });
}

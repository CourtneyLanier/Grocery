interface GroceryItem {
    task: string;
    done: boolean;
  }
  
  let groceries: GroceryItem[] = [
    { task: "Half and half", done: false },
    { task: "Bread", done: false },
    { task: "Veggies", done: false }
  ];
  
  function showGroceries(): void {
    const list = document.getElementById("foodList") as HTMLUListElement;
    list.innerHTML = "";
  
    groceries.forEach((item, index) => {
      const li = document.createElement("li");
  
      if (item.done) {
        li.classList.add("checked");
        li.textContent = item.task + " ✅";
      } else {
        li.textContent = item.task;
      }
  
      li.onclick = () => {
        if (!item.done) {
          item.done = true;
        } else {
          groceries.splice(index, 1);
        }
        showGroceries();
      };
  
      list.appendChild(li);
    });
  }
  
  document.getElementById("addItemForm")!.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const input = document.getElementById("newItem") as HTMLInputElement;
    const newItemText = input.value.trim();
    if (newItemText !== "") {
      groceries.push({ task: newItemText, done: false });
      input.value = "";
      showGroceries();
    }
  });
  
  showGroceries();
  
interface toDoItem {
    task: string;
    done: Boolean;
}

let groceries: toDoItem[] = [
    { task: "Half and half", done: false },
    { task: "Bread", done: false },
    { task: "Veggies", done: false },
    { task: "Frozen Veggies", done: false },
    { task: "Rice", done: false },
    { task: "Sliced Cheese", done: false },
    { task: "Chips", done: false }
];

function showGroceries() {
    const list = document.getElementById("foodList");
    if (!list) return;

    list.innerHTML = "";

    groceries.forEach((groceries, index) => {
        const li = document.createElement("li");

        li.textContent = `${groceries.task} - ${groceries.done ? "✅" : "❌"}`;
            
        if (!groceries.done) {
            const button = document.createElement("button");
            button.textContent = "Mark Done";
            button.onclick = () => {
                groceries.done = true;
                showGroceries();
            };
            li.appendChild(button);
        }    

        list.appendChild(li);
    });
}

showGroceries();
var groceries = [
    { task: "Half and half", done: false },
    { task: "Bread", done: false },
    { task: "Veggies", done: false },
    { task: "Frozen Veggies", done: false },
    { task: "Rice", done: false },
    { task: "Sliced Cheese", done: false },
    { task: "Chips", done: false }
];
function showGroceries() {
    var list = document.getElementById("foodList");
    if (!list)
        return;
    list.innerHTML = "";
    groceries.forEach(function (groceries, index) {
        var li = document.createElement("li");
        li.textContent = "".concat(groceries.task, " - ").concat(groceries.done ? "✅" : "❌");
        if (!groceries.done) {
            var button = document.createElement("button");
            button.textContent = "Mark Done";
            button.onclick = function () {
                groceries.done = true;
                showGroceries();
            };
            li.appendChild(button);
        }
        list.appendChild(li);
    });
}
showGroceries();

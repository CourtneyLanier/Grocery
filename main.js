var groceries = [
    { task: "Half and half", done: false },
    { task: "Bread", done: false },
    { task: "Veggies", done: false }
];
function showGroceries() {
    var list = document.getElementById("foodList");
    list.innerHTML = "";
    groceries.forEach(function (item, index) {
        var li = document.createElement("li");
        if (item.done) {
            li.classList.add("checked");
            li.textContent = item.task + " ✅";
        }
        else {
            li.textContent = item.task;
        }
        li.onclick = function () {
            if (!item.done) {
                item.done = true;
            }
            else {
                groceries.splice(index, 1);
            }
            showGroceries();
        };
        list.appendChild(li);
    });
}
document.getElementById("addItemForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = document.getElementById("newItem");
    var newItemText = input.value.trim();
    if (newItemText !== "") {
        groceries.push({ task: newItemText, done: false });
        input.value = "";
        showGroceries();
    }
});
showGroceries();

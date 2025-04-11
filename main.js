var groceries = [];
// 🚀 Load from localStorage (if anything's there)
var savedList = localStorage.getItem("groceries");
if (savedList) {
    groceries = JSON.parse(savedList);
}
function saveGroceries() {
    // 💾 Save current groceries to browser
    localStorage.setItem("groceries", JSON.stringify(groceries));
}
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
                groceries.splice(index, 1); // remove if clicked again
            }
            saveGroceries(); // 💾 save after update
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
        saveGroceries(); // 💾 save after add
        showGroceries();
    }
});
showGroceries(); // 🟢 render list

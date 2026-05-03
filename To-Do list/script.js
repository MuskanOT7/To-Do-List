const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");

        // Create the checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox"; // Changed from "radio" to "checkbox"
        li.appendChild(checkbox);

        // Create a span for the task text
        let taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.innerHTML = inputBox.value;
        li.appendChild(taskText);

        // Create the delete button (X)
        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7";
        deleteBtn.classList.add("delete-btn"); // Add a class for styling
        li.appendChild(deleteBtn);

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
        const listItem = e.target.closest("li");
        if (listItem) {
            listItem.classList.toggle("checked");
        }
        saveData();
    } else if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    const checkboxes = listContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const listItem = checkbox.closest("li");
        if (listItem && listItem.classList.contains("checked")) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });
}

showTask();
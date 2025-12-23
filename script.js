const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Load tasks from localStorage when page loads
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
        addListeners();
    }
}

// Add a new task
function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = inputBox.value;
    
    // Create delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7"; // × symbol
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() {
        this.parentElement.remove();
        saveTasks();
    };
    
    li.appendChild(deleteBtn);
    listContainer.appendChild(li);
    
    inputBox.value = "";
    saveTasks();
    addListeners();
}

// Add event listeners to list items
function addListeners() {
    const listItems = document.querySelectorAll("li");
    listItems.forEach(item => {
        if (!item.hasListener) {
            item.onclick = function(e) {
                // Only toggle checked if clicking on text, not the delete button
                if (e.target.className !== "delete-btn") {
                    this.classList.toggle("checked");
                    saveTasks();
                }
            };
            item.hasListener = true;
        }
    });
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

// Allow Enter key to add task
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Load tasks when page loads
window.addEventListener("load", loadTasks);

// --- Custom Cursor Logic ---
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('clicked');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicked');
});

const interactiveElements = document.querySelectorAll('button, .task-text, .delete-icon');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('pointer'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('pointer'));
});

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', showTasks);

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Load tasks from localStorage when page loads
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        try {
            listContainer.innerHTML = savedTasks;
            attachEventListeners();
        } catch (error) {
            console.error("Error loading tasks:", error);
            listContainer.innerHTML = "";
        }
    }
}

// Add a new task
function addTask() {
    const taskValue = inputBox.value.trim();
    
    if (taskValue === "") {
        inputBox.focus();
        inputBox.classList.add("shake");
        setTimeout(() => inputBox.classList.remove("shake"), 500);
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${escapeHtml(taskValue)}</span>
        <span class="delete-btn">×</span>
    `;
    
    listContainer.appendChild(li);
    inputBox.value = "";
    inputBox.focus();
    saveTasks();
    attachEventListeners();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Attach event listeners to list items
function attachEventListeners() {
    const listItems = document.querySelectorAll("li");
    listItems.forEach(item => {
        const deleteBtn = item.querySelector(".delete-btn");
        const taskText = item.querySelector(".task-text");
        
        // Remove old listeners
        item.onclick = null;
        if (deleteBtn) deleteBtn.onclick = null;
        
        // Toggle checked on task text click
        if (taskText) {
            taskText.addEventListener("click", function(e) {
                e.stopPropagation();
                item.classList.toggle("checked");
                saveTasks();
            });
        }
        
        // Delete task on × click
        if (deleteBtn) {
            deleteBtn.addEventListener("click", function(e) {
                e.stopPropagation();
                item.style.animation = "slideOut 0.3s ease forwards";
                setTimeout(() => {
                    item.remove();
                    saveTasks();
                }, 300);
            });
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
window.addEventListener("load", function() {
    // Clear any old sample tasks (Task 1, Task 2, Task 3) from localStorage
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks && (savedTasks.includes("Task 1") || savedTasks.includes("Task 2") || savedTasks.includes("Task 3"))) {
        localStorage.removeItem("tasks");
        listContainer.innerHTML = "";
    } else {
        loadTasks();
    }
});

// Function to manually clear all tasks (can be called from browser console)
window.clearAllTasks = function() {
    localStorage.removeItem("tasks");
    listContainer.innerHTML = "";
    console.log("✓ All tasks cleared!");
};

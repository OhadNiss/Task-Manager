"use strict";

function save() {
    // Take DOM elements:
    const descriptionBox = document.getElementById("descriptionBox");
    const timeBox = document.getElementById("timeBox");

    // Create object :
    const description = descriptionBox.value;
    const time = timeBox.value;

    const task = { description, time };
    // Create Validation : 
    const missing = document.getElementById("missing");
    if (description === "") {
        missing.innerHTML = ` - Please put a description!`;
        descriptionBox.focus();
        event.preventDefault();


        return;
    }
    missing.innerHTML = "";
    const missing1 = document.getElementById("missing1");

    const parsedDateTime = new Date(time);
    if (isNaN(parsedDateTime)) {
        missing1.innerHTML = ` - Please put a date and time!`;
        timeBox.focus();
        event.preventDefault();

        return;
    }
    missing1.innerHTML = "";



    // Take data from storage:

    let json = localStorage.getItem("tasks");
    const tasks = json ? JSON.parse(json) : [];

    // Add a new task:
    tasks.push(task);

    // Save back:

    json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);


    displayTasks();

    event.preventDefault();





}



function displayTasks() {
    // Take data from storage :
    let json = localStorage.getItem("tasks");
    const tasks = JSON.parse(json);

    // make and display the tasks :
    let html = "";
    const totalTasks = tasks.length;

    for (let i = 0; i < totalTasks; i++) {
        const taskDate = new Date(tasks[i].time);
        const formattedDate = taskDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        const formattedTime = taskDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
        });

        html += `
      <div class="task ${i === totalTasks - 1 ? "fade-in" : ""}">
        <div class="headDiv">My Task :</div>
        <button class="remove" onclick="remove(${i})">❌</button>
        <div class="taskContent scrollable-container">
          ${tasks[i].description}
        </div>
        <div class="taskDateTime">
          <hr>
          ${formattedDate}<br>
          ${formattedTime}
        </div> 
      </div>
    `;
    }

    const sectionTasks = document.getElementById("sectionTasks");
    sectionTasks.innerHTML = html;
    // Clear the box after use :
    descriptionBox.value = "";
    timeBox.value = "";

}

function remove(index) {
    event.preventDefault();

    // Get the tasks from storage
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    }
    }


// Block the date from the past 
function newDateTime() {

    const currentTime = new Date(); // Get the current date and time
    const formattedCurrentTime = currentTime.toISOString().slice(0, 16); // Format the current time 

    document.getElementById("timeBox").min = formattedCurrentTime;
    displayTasks();

}










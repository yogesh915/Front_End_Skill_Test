
let alarms=[]; // An array to store alarm objects. Each alarm object contains hours, minutes, seconds, and AM/PM values.

function updateClock(){  // A function that updates the clock display every second.
    // // alertAlarm();
    const now = new Date(); //  Creates a new Date object representing the current date and time.

    let hours = now.getHours(); // Extract the current hours, minutes, and seconds from the Date object.
    let minutes = now.getMinutes(); // Extract the current hours, minutes, and seconds from the Date object.
    let seconds = now.getSeconds(); // Extract the current hours, minutes, and seconds from the Date object.

    const ampm = hours >= 12 ? 'PM' : 'AM'; //  Determines whether it's AM or PM based on the current hour.

    hours = hours % 12; // Converts hours to 12-hour format.
    hours = hours ? hours : 12; // the hour 0 should be 12

    // Pads minutes and seconds with a leading zero if they are less than 10 to maintain a consistent two-digit format.
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;


    // Constructs a string representing the current time in HH:MM:SS AM/PM format.
    const strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

    // Updates the HTML element with id clock-face to display the current time
    document.getElementById('clock-face').innerText = strTime; 

    // Calls the checkAlarms function to see if any alarms need to be triggered
    checkAlarms(hours, minutes, seconds, ampm);

}

// A function that checks if any alarm matches the current time

function checkAlarms(hours, minutes, seconds, ampm) {

    alarms.forEach((alarm, index) => { //Iterates over each alarm in the alarms array
        // Checks if the current time matches the alarm time
        if (alarm.hours == hours && alarm.minutes == minutes && alarm.seconds == seconds && alarm.ampm == ampm) {
            alert('Alarm ringing!');  // If it matches, triggers an alert
            alarms.splice(index, 1); // removes the alarm from the array
            renderAlarms(); //updates the alarms list
        }
    });

}

// A function to set a new alarm
function setAlarm(){
    // Retrieves the values from the input fields
    const hour = document.getElementById('hour').value;
    const min = document.getElementById('min').value;
    const sec = document.getElementById('sec').value;
    const ampm = document.getElementById('am-pm').value;

    // Checks if any of the input fields are empty. If so, it alerts the user to fill all fields and exits the function.

    if(hour === '' || min === '' || sec === '' || ampm === ''){
        alert('Please fill all fields');
        return;
    }

    // Created an alarm object with the parsed values from the input fields.

    const alarm = {
        hours: parseInt(hour),
        minutes: parseInt(min),
        seconds: parseInt(sec),
        ampm: ampm
    };

    alarms.push(alarm); //Adds the new alarm object to the alarms array.

    renderAlarms();// Calls renderAlarms to update the displayed list of alarms.
}

// A function to render the list of alarms

function renderAlarms() {

    const alarmsList = document.getElementById('alarms');
    alarmsList.innerHTML = ''; //Clears the current list of alarms

    alarms.forEach((alarm, index) => {  // Iterates over the alarms array and creates a new list item for each alarm.

        const alarmItem = document.createElement('li');
        alarmItem.innerText = `${alarm.hours}:${alarm.minutes}:${alarm.seconds} ${alarm.ampm}`; //Sets the text of the list item to the alarm time.
        const deleteButton = document.createElement('button'); //Created a delete button for each alarm
        deleteButton.innerText = 'Delete'; // Sets the button's text to "Delete"
        deleteButton.onclick = () => {  //Adds an onclick event to the button that removes the alarm from the alarms array and calls renderAlarms to update the list.
            alarms.splice(index, 1);
            renderAlarms();
        };
        alarmItem.appendChild(deleteButton); //Appends the delete button to the alarm list item.
        alarmsList.appendChild(alarmItem);  // Appends the alarm list item to the alarmsList element.

    });
}

setInterval(updateClock, 1000); // Update the clock every second
updateClock();// Calls the updateClock function immediately to display the current time as soon as the page loads.



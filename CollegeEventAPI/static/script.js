async function loadEvents(){

const response=await fetch('/events');

const data=await response.json();

let table="";

data.forEach(event=>{

table+=`
<tr>

<td>${event.id}</td>

<td>${event.event_name}</td>

<td>${event.club}</td>

<td>${event.venue}</td>

<td>${event.date}</td>

<td>${event.status}</td>

</tr>
`;

});

document.getElementById("eventTable").innerHTML=table;

}

async function addEvent() {

    const event = {

        id: Number(document.getElementById("id").value),

        event_name: document.getElementById("event_name").value,

        club: document.getElementById("club").value,

        venue: document.getElementById("venue").value,

        date: document.getElementById("date").value,

        status: document.getElementById("status").value

    };

    await fetch('/events', {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify(event)

    });

    // Clear all input fields
    document.getElementById("id").value = "";
    document.getElementById("event_name").value = "";
    document.getElementById("club").value = "";
    document.getElementById("venue").value = "";
    document.getElementById("date").value = "";
    document.getElementById("status").value = "Upcoming";

    // Reload the table
    loadEvents();

    // Show success message
    alert("✅ Event Added Successfully!");

}

loadEvents();
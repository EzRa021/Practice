// Fetch workplan data from JSON file
async function fetchWorkplanData() {
  try {
    const response = await fetch('state_workplan_json.JSON');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching workplan data:', error);
    return [];
  }
}

// Convert date format to 'Day, Month Date' (e.g., 'Wed, Oct 23')
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

// Map data to the table
const populateTable = (data) => {
  const thead = document.querySelector("thead tr");
  const tbody = document.querySelector("tbody");

  // Clear existing table content
  const headerCells = thead.querySelectorAll("th:not(:first-child)");
  headerCells.forEach(cell => cell.remove());
  tbody.innerHTML = '';

  // Set the table headers
  data.forEach((entry) => {
    const dateFormatted = formatDate(entry.activity_date);
    const th = document.createElement("th");
    th.className = "p-2";
    th.innerText = dateFormatted;
    thead.appendChild(th);
  });

  // Fill table body with trip data by time
  const times = ["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"];
  times.forEach((time) => {
    const tr = document.createElement("tr");
    const tdTime = document.createElement("td");
    tdTime.className = "border-2 border-red-300 td-date";
    tdTime.innerText = time;
    tr.appendChild(tdTime);

    // For each date column, insert trip status and lead if it matches the time
    data.forEach((entry) => {
      const td = document.createElement("td");
      td.className = "border-2 border-red-300";
      if (entry.trip_start_time === time) {
        const div = document.createElement("div");
        div.className = "p-1 m-1 bg-green-400 rounded-lg";

        const pStatus = document.createElement("p");
        pStatus.className = "data1";
        pStatus.innerText = entry.activity_title;
        div.appendChild(pStatus);

        const pLead = document.createElement("p");
        pLead.className = "data2 text-right";
        pLead.innerText = entry.trip_lead;
        div.appendChild(pLead);

        td.appendChild(div);
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
};

// Initialize the table
async function initializeTable() {
  const data = await fetchWorkplanData();
  if (data.length > 0) {
    populateTable(data);
  }
}

// Run the initialization when the document is ready
document.addEventListener('DOMContentLoaded', initializeTable);
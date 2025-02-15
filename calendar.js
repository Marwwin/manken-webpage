export function createCalendar(){
  const m = getFullMonth(new Date())
  console.log(m[0])
  console.log(m[0].getDay())
  console.log(m[1].getDay())
 return `
    <main class="calendar-container">
        <div class="calendar-header">
            <button class="prev-month" hx-get="/calendar?month=prev" hx-target=".calendar-grid">Previous</button>
            <h2>February 2025</h2>
            <button class="next-month" hx-get="/calendar?month=next" hx-target=".calendar-grid">Next</button>
        </div>

        <div class="calendar-grid">
            <div class="weekday">Sun</div>
            <div class="weekday">Mon</div>
            <div class="weekday">Tue</div>
            <div class="weekday">Wed</div>
            <div class="weekday">Thu</div>
            <div class="weekday">Fri</div>
            <div class="weekday">Sat</div>

            <!-- First week empty days -->

            <div class="day empty"></div>
            <div class="day empty"></div>
            <div class="day empty"></div>
            <div class="day empty"></div>
            <div class="day">1</div>
            <div class="day">2</div>
            <div class="day">3</div>

            <!-- Rest of the month -->
            <div class="day">4</div>
            <div class="day">5</div>
            <div class="day">6</div>
            <div class="day">7</div>
            <div class="day">8</div>
            <div class="day">9</div>
            <div class="day">10</div>
            <!-- Continue for rest of month -->
        </div>
    </main>

`
}

function getFullMonth(date){
  const currentMonth = date.getMonth();
  const month = [];

  let d = new Date();
  d.setYear(date.getFullYear())
  d.setMonth(currentMonth)
  d.setDate(1);
  while (d.getMonth() === currentMonth){
    month.push(new Date(d));
    d.setDate(d.getDate() + 1)
  }
  return month;
}

createCalendar()

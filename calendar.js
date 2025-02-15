export function createCalendar(date) {

  const m = getFullMonth(date)
  const emptyDays = getEmptyDays(m[0]);
  const daysInFirstWeek = m.slice(0, emptyDays);
  const restOfMonth = m.slice(emptyDays);
  const emptyDaysEndMonth = 7 - restOfMonth.at(-1).getDay()

  const prevMonth = new Date(date)
  prevMonth.setMonth(date.getMonth() -1)
  const nextMonth = new Date(date)
  nextMonth.setMonth(date.getMonth() +1)
  return `
    <main class="calendar-container">
        <div class="calendar-header">
            <button class="prev-month" hx-get="/calendar?date=${prevMonth.getTime()}" hx-target="main">Previous</button>
            <h2>${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}</h2>
            <button class="next-month" hx-get="/calendar?date=${nextMonth.getTime()}" hx-target="main">Next</button>
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
            ${emptyDays === 0 ? `` : [...new Array(emptyDays)].map(e => `<div class="day empty"></div>`).join("")}

            <!-- First week days -->
            ${daysInFirstWeek.map(e => `<div class="day">${e.getDate()}</div>`).join("")}

            <!-- Rest of the month -->
            ${restOfMonth.map(e => `<div class="day">${e.getDate()}</div>`).join("")}

            <!-- Last week emptyDays days -->
            ${emptyDaysEndMonth === 0 ? `` : [...new Array(emptyDaysEndMonth)].map(e => `<div class="day empty"></div>`).join("")}
        </div>
    </main>
`
}

function getEmptyDays(firstDate) {
  const f = firstDate.getDay();
  if (f === 0) {
    return 6;
  }
  return f - 1;
}

function getFullMonth(date) {
  const currentMonth = date.getMonth();
  const month = [];

  let d = new Date();
  d.setYear(date.getFullYear())
  d.setMonth(currentMonth)
  d.setDate(1);
  while (d.getMonth() === currentMonth) {
    month.push(new Date(d));
    d.setDate(d.getDate() + 1)
  }
  return month;
}


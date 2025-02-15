import { Database } from "bun:sqlite";

export function createDb() {
  const db = new Database("calendar.sqlite", { create: true, strict: true });
  db.query(
    `
CREATE TABLE IF NOT EXISTS events (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
start_date DATETIME NOT NULL,
end_date DATETIME NOT NULL)`,
  ).run();

  // const insertEvent = db.query(`INSERT INTO events (title, start_date, end_date) VALUES ($title, $start_date, $end_date)`);
  // const d = new Date();
  // console.log("creating event at", d.getTime());
  // try {
  //   insertEvent.run({
  //     title: "Test",
  //     start_date: d.getTime(),
  //     end_date: d.getTime(),
  //   });
  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   db.close();
  // }
}

export function getEventsBetween(startDate, endDate) {
  const db = new Database("calendar.sqlite", { create: true, strict: true });
  const events = db
    .prepare(
      `
    SELECT * FROM events
    WHERE start_date >= ? AND end_date <= ?
    ORDER BY start_date ASC`,
    )
    .all([startDate, endDate]);
  db.close();
  return events;
}

export function deleteEvent(id) {
  const db = new Database("calendar.sqlite", { create: true, strict: true });
  return db
    .prepare(
      `
    DELETE FROM events
    WHERE id = ?`,
    )
    .run([id]);
}

export function getAllEvents() {
  const db = new Database("calendar.sqlite", { create: true, strict: true });
  const events = db
    .prepare(
      `
    SELECT * FROM events
    ORDER BY start_date ASC
  `,
    )
    .all();

  db.close();
  return events;
}

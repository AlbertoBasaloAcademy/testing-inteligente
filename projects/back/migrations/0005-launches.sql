CREATE TABLE launches (
  id TEXT PRIMARY KEY,
  rocketId TEXT NOT NULL REFERENCES rockets(id),
  date TEXT NOT NULL,
  pricePerPassenger REAL NOT NULL,
  createdAt TEXT NOT NULL,
  UNIQUE (rocketId, date)
);

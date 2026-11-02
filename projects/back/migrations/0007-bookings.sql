CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  launchId TEXT NOT NULL REFERENCES launches(id),
  name TEXT NOT NULL,
  nationality TEXT NOT NULL,
  identityDocument TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  UNIQUE (launchId, identityDocument)
);

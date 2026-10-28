ALTER TABLE launches ADD COLUMN status TEXT NOT NULL DEFAULT 'planned';
ALTER TABLE launches ADD COLUMN suspensionCause TEXT;
ALTER TABLE launches ADD COLUMN suspensionMessage TEXT;

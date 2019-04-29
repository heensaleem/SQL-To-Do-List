CREATE TABLE "todos" (
   "id" SERIAL PRIMARY KEY,--always have!
   "name" VARCHAR(50) NOT NULL,
   "task"  VARCHAR(120) NOT NULL,
   "notes" VARCHAR(120) NOT NULL,
   "taskStatus"  BOOLEAN
   
);

INSERT INTO "todos" ("name", "task","notes", "taskStatus")
VALUES  ('heena','complete Assignment', 'very important', 'yes'),
       ('Jean','go to jym', ' important', 'no');

UPDATE "todos"
  SET "taskStatus" = 'true'
  WHERE "id" = 1;

DELETE FROM "todos"
      WHERE "id" = 1;
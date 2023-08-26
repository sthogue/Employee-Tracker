INSERT INTO department (id, name)
VALUES (1, "Human Resources"),
       (2, "Marketing"),
       (3, "Sales"),
       (4, "IT"),
       (5, "Finance"),
       (6, "Legal"),


INSERT INTO roles (id, title, salary, department_id)
VALUES  (1, "Recruiter", 55000, 1)
        (2, "Human Resource Manager", 60000, 1)
        (3, "Marketing Associate", 45000, 2)
        (4, "Marketing Manager", 60000, 2)
        (5, "Sales Associate", 50000, 3)
        (6, "Sales Manager", 60000, 3)
        (7, "IT Associate", 50000, 4)
        (8, "IT Manager", 60000, 4)
        (9, "Financial Analyst", 55000, 5)
        (10, "Financial Manager", 60000, 5)
        (11, "Legal Associate", 50000, 6)
        (12, "Legal Manager", 60000, 6)
        (13, "Head of Legal Council", 70000, 6)
        (14, "Director of IT", 80000, 4),
        (15, "Director of HR", 80000, 1),
        (16, "Director of Sales", 75000, 3),
        (17, "Accountant", 88000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "James", "Smith", 1, 15),
       (2, "John", "Johnson", 2, 15),
       (3, "Robert", "Williams", 3, 16),
       (4, "Michael", "Jones", 4, 16),
       (5, "William", "Brown", 5, 16),
       (6, "David", "Davis", 6, 16),
       (7, "Richard", "Miller", 7, 14),
       (8, "Joseph", "Wilson", 8, 14),
       (9, "Thomas", "Moore", 9, 17),
       (10, "Charles", "Taylor", 10, 17),
       (11, "Christopher", "Anderson", 11, 13),
       (12, "Daniel", "Thomas", 12, 13),
       (13, "Matthew", "Jackson", 13, NULL),
       (14, "Anthony", "White", 14, NULL),
       (15, "Donald", "Harris", 15, NULL),
       (16, "Mark", "Martin", 16, NULL),
       (17, "Paul", "Thompson", 17, NULL);

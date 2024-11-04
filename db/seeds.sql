INSERT INTO department (department_name) VALUES
    ('Finance'),
    ('Engineering'),
    ('Sales'),
    ('Legal');

INSERT INTO roles (title, salary, department_id) VALUES
    ('Financial Analyst', 70000, 1),
    ('Chief Financial Officer', 150000, 1),
    ('Software Engineer', 100000, 2),
    ('Software Manager', 120000,2)
    ('Sales Representative', 60000, 3),
    ('Sales Manager', 90000, 3),
    ('Legal Counsel', 110000, 4),
    ('Legal Assistant', 50000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, 2),
    ('Mike', 'Chan', 2, NULL),
    ('Ashley', 'Rodriguez', 3, 4),
    ('Kevin', 'Tupik', 4, NULL),
    ('Kunal', 'Singh', 5, 6),
    ('Malia', 'Brown', 6, NULL),
    ('Sarah', 'Lourd', 7, NULL),
    ('Jim', 'Allen', 8, 7);
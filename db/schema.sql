DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREAT TABLE deprtment (
    id: SERIAL PRIMARY KEY,
    department_name: VARCHAR (30) UNIQUE NOT NULL,
);

CREAT TABLE roles (
    id: SERIAL PRIMARY KEY,
    title: VARCHAR (30) UNIQUE NOT NULL,
    salary: DECIMAL NOT NULL
    department_id: INTEGER NOT NULL,
    FORIEGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL,
);

CREAT TABLE employees (
    id: SERIAL PRIMARY KEY,
    first_name: VARCHAR (30) NOT NULL,
    last_name: VARCHAR (30) NOT NULL,
    role_id: INTEGER NOT NULL,
    manager_id: INTEGER,
    FORIEGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    FORIEGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL,
);
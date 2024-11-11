import inquirer from "inquirer";
import pg from "pg";
import dbconfig from "./config/config.js";

const pool = new pg.Pool(dbconfig);

async function mainMenu() {
   const { action } = await inquirer.prompt([
    {
        type: "list",
        name: "action",
        message: "Choose an aciton",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Exit",
        ],
    },
   ]);

   switch (action) {
    case "View all departments":
        await viewAllDepartments();
        break;
    case "View all roles":
        await viewAllRoles();
        break;
    case "View all employees":
        await viewAllEmployees();
        break;
    case "Add a department":
        await addDepartment();
        break;
    case "Add a role":
        await addRole();
        break;
    case "Add an employee":
        await addEmployee();
        break;
    case "Update an employee role":
        await updateEmployeeRole();
        break;
    case "Exit":
        console.log("Goodbye!");
        pool.end();
        return;
   }
// return to the main menu after an action
   await mainMenu();
}
// function for viewing all departments
async function viewAllDepartments() {
    const result = await pool.query("SELECT id AS \"Department ID\", department_name AS \"Department Name\" FROM department");
    console.table(result.rows);
}
// function for viewing all roles
async function viewAllRoles() {
    const result = await pool.query("SELECT roles.id AS \"Role ID\", roles.title AS \"Job Title\", roles.salary AS \"Salary\", department.department_name AS \"Department Name\" FROM roles JOIN department ON roles.department_id = department.id")
    console.table(result.rows);
}
// function for viewing all employees
async function viewAllEmployees() {
    const result = await pool.query("SELECT employees.id AS \"Employee ID\", employees.first_name AS \"First Name\", employees.last_name AS \"Last Name\", roles.title AS \"Job Title\", department.department_name AS \"Department Name\", roles.salary AS \"Salary\", manager.first_name AS \"Manager First Name\", manager.last_name AS \"Manager Last Name\" FROM employees JOIN roles ON employees.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employees AS manager ON employees.manager_id = manager.id")
    console.table(result.rows);
}
// function for adding a department
async function addDepartment() {
    const { departmentName } = await inquirer.prompt([
        {
            type: "input",
            name:"departmentName", 
            message: "Enter department name:"
        },
    ]);
    await pool.query("INSERT INTO department (department_name) VALUES ($1)", [departmentName]);
    console.log(`Department "${departmentName}" added.`);
}
// funciton for adding a role
async function addRole() {
    const { title, salary, department_id } = await inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "Enter role title:",
    },
    {
        type: "input",
        name: "salary",
        message: "Enter role salary:",
    },
    {
        type: "input",
        name: "department_id",
        message: "Enter department ID:",
    }
    ]);
    await pool.query("INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id]);
}
// function for adding an employee
async function addEmployee() {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter employee's first name:",
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter employee's last name:",
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter role ID:",
        },
        {
            type: "input",
            name: "manager_id",
            message: "Enter manager Id (or leave blank):",
        },
    ]);
    await pool.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
        [first_name, last_name, role_id, manager_id || null]
    );
    console.log(`Employee "${first_name} ${last_name}" added.`);
}
// function for updating an empoloyee's role
async function updateEmployeeRole() {
    const { employeeId, newRoleId } = await inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "Enter the employee ID:",
        },
        {
            type: "input",
            name: "newRoleId",
            message: "Enter the new role ID:",
        },
    ]);
    await pool.query("UPDATE employees SET role_id = $1 WHERE id = $2", [ newRoleId, employeeId]);
    console.log(`Employee ID ${employeeId} role updated.`);
}

// start the main menu
mainMenu();
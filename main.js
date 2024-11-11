import inquirer from "inquirer";
import pg from "pg";
import dbconfig from "/config/config.js";

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
        await viewAllDepartmetns();
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
    case "Update an employee roel":
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
async function viewAllDepartmetns() {
    const result = await pool.query("SELECT * FROM departments");
    console.table(result.rows);
}
// function for viewing all roles
async function viewAllRoles() {
    const result = await pool.query("SELECT * FROM roles")
    console.table(result.rows);
}
// function for viewing all employees
async function viewAllEmployees() {
    const result = await pool.query("SELECT * FROM employees")
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
    await pool.query("INERT INTO departments (department_name) VALUES ($1)", [departmentName]);
    console.log(`Department "${departmentName}" added.`);
}
// funciton for adding a role
async function addRole() {
    const { title, salary, departmentId } = await inquirer.prompt([
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
        name: "departmentId",
        message: "Enter department ID:",
    }
    ]);
    await pool.query("INERT INTO roles (title, salary, departmentId) VALUES ($1, $2, $3)", [title, salary, departmentId]);
}
// function for adding an employee
async function addEmployee() {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: "input",
            name: "firstNmae",
            message: "Enter employee's first name:",
        },
        {
            type: "input",
            name: "lastNmae",
            message: "Enter employee's last name:",
        },
        {
            type: "input",
            name: "roleId",
            message: "Enter role ID:",
        },
        {
            type: "input",
            name: "managerId",
            message: "Enter manager Id (or leave blank):",
        },
    ]);
    await pool.query("INSERT INTO employees (firstnName, lastName, roleId, managerId) VALUES ($1, $2, $3, $4)",
        [firstName, lastName, roleId, managerId || null]
    );
    console.log(`Employee "${firstName} ${lastName}" added.`);
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
const connection = require("./connection");

// Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
function findAllEmployees() {
  return connection
    .promise()
    .query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
}
// find all departments function
function findAllDepartments() {
  return connection.promise().query("SELECT * from department");
}

// Find all employees except the given employee id
function findAllPossibleManagers(employeeId) {
  return connection
    .promise()
    .query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?;",
      employeeId
    );
}
// Create a new employee
function createEmployee(employee) {
  return connection.promise().query("INSERT INTO employee SET ?;", employee);
}

// Remove an employee with the given id
function removeEmployee(employeeId) {
  return connection
    .promise()
    .query("DELETE FROM employee WHERE id = ?;", employeeId);
}
function viewEmployeesByManager(managerId) {
  return connection
    .promise()
    .query(
      "SELECT e.id, e.first_name, e.last_name, department.department_name, role.title FROM employee LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      managerId
    );
}
function viewEmployeesByDepartment(departmentId) {
  return connection
    .promise()
    .query(
      "SELECT e.id, e.first_name, e.last_name, role.title FROM employee LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON department.id = role.department_id WHERE department_id = ?;",
      departmentId
    );
}
// viewAllEmployeesByManager = () => {
//   connection.query(
//     `SELECT employee_id, first_name, last_name FROM employee ORDER BY employee_id ASC;`,
//     (err, res) => {
//       if (err) throw err;
//       let managers = res.map((employee) => ({
//         name: employee.first_name + " " + employee.last_name,
//         value: employee.employee_id,
//       }));
//       inquirer
//         .prompt([
//           {
//             name: "manager",
//             type: "rawlist",
//             message: "Which manager would you like to see the employee's of?",
//             choices: managers,
//           },
//         ])
//         .then((response) => {
//           connection.query(
//             `SELECT e.employee_id, e.first_name, e.last_name, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.employee_id JOIN role ON e.role_id = role.role_id JOIN department ON department.department_id = role.department_id WHERE e.manager_id = ${response.manager} ORDER BY e.employee_id ASC`,
//             (err, res) => {
//               if (err) throw err;
//               console.table("\n", res, "\n");
//               startApp();
//             }
//           );
//         });
//     }
//   );
// };
function findAllRoles() {
  return connection.promise().query("SELECT * from role");
}
// function updateEmployeeRole(employeeId, roleId) {
//   return connection.promise().query("")
// }
function updateEmployeeRole(employeeId, roleId) {
  return connection
    .promise()
    .query("UPDATE employee SET role_id = ? WHERE id = ?;", [
      roleId,
      employeeId,
    ]);
}
// function sum(a,b) {
//   return (a+b)
// }
// sum(5,4)
function createDepartment(department) {
  return connection
    .promise()
    .query("INSERT INTO department SET ?;", department);
}
function removeDepartment(departmentId) {
  return connection
    .promise()
    .query("DELETE FROM department WHERE id = ?;", departmentId);
}

function updateEmployeeManager(employee, manager) {
  return connection
    .promise()
    .query(
      "Update employee SET manager_id = ? WHERE id = ?;",
      manager,
      employee
    );
}

function createRole(role) {
  return connection.promise().query("INSERT INTO role SET ?;", role);
}
// createRole = () => {
//   connection.query(`SELECT * FROM department;`, (err, res) => {
//     if (err) throw err;
//     let departments = res.map((department) => ({
//       name: department.department_name,
//       value: department.department_id,
//     }));
//     inquirer
//       .prompt([
//         {
//           name: "title",
//           type: "input",
//           message: "What is the name of the role you want to add?",
//         },
//         {
//           name: "salary",
//           type: "input",
//           message: "What is the salary of the role you want to add?",
//         },
//         {
//           name: "deptName",
//           type: "rawlist",
//           message: "Which department do you want to add the new role to?",
//           choices: departments,
//         },
//       ])
//       .then((response) => {
//         connection.query(
//           `INSERT INTO role SET ?`,
//           {
//             title: response.title,
//             salary: response.salary,
//             department_id: response.deptName,
//           },
//           (err, res) => {
//             if (err) throw err;
//             console.log(
//               `\n ${response.title} successfully added to database! \n`
//             );
//             startApp();
//           }
//         );
//       });
//   });
// };
function removeRole(roleId) {
  return connection.promise().query("DELETE FROM role WHERE id = ?;", roleId);
}
// removeARole = () => {
//   connection.query(`SELECT * FROM role ORDER BY role_id ASC;`, (err, res) => {
//     if (err) throw err;
//     let roles = res.map((role) => ({ name: role.title, value: role.role_id }));
//     inquirer
//       .prompt([
//         {
//           name: "title",
//           type: "rawlist",
//           message: "Which role would you like to remove?",
//           choices: roles,
//         },
//       ])
//       .then((response) => {
//         connection.query(
//           `DELETE FROM role WHERE ?`,
//           [
//             {
//               role_id: response.title,
//             },
//           ],
//           (err, res) => {
//             if (err) throw err;
//             console.log(
//               `\n Successfully removed the role from the database! \n`
//             );
//             startApp();
//           }
//         );
//       });
//   });
// };
function viewRoles() {
  return connection
    .promise()
    .query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;"
    );
}
// function viewUtilizedBudgetByDepartment() {
//   return connection.promise().query;
// }

module.exports = {
  createEmployee,
  removeEmployee,
  findAllEmployees,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  createDepartment,
  findAllDepartments,
  createRole,
  removeRole,
  findAllRoles,
  viewRoles,
  updateEmployeeRole,
  removeDepartment,
  updateEmployeeManager,
  viewUtilizedBudgetByDepartment,
};

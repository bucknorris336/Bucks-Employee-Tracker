const connection = require("./connection");

// Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
function findAllEmployees() {
  return connection
    .promise()
    .query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
}

function findAllDepartmants() {
  return connection.promise().query("SELECT * from department");
}

// Find all employees except the given employee id
function findAllPossibleManagers(employeeId) {
  return connection
    .promise()
    .query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );

  // Create a new employee
  function createEmployee(employee) {
    return connection.promise().query("INSERT INTO employee SET ?", employee);
  }

  // Remove an employee with the given id
  function removeEmployee(employeeId) {
    return connection
      .promise()
      .query("DELETE FROM employee WHERE id = ?", employeeId);
  }
  function viewEmployeesByManager() {
    return connection.promise().query();
  }
  function addEmployee() {
    return connection;
  }
  function updateEmployeeRole() {
    return connection;
  }

  function addDepartment() {
    return connection;
  }
  function removeDepartment() {
    return connection;
  }

  function updateEmployeeManager() {
    return connection;
  }
  function addRole() {
    return connection;
  }
  function removeRole() {
    return connection;
  }
  function viewRoles() {
    return connection;
  }
  function viewUtilizedBudgetByDepartment() {
    return connection;
  }
}

module.exports = {
  createEmployee,
  addEmployee,
  removeEmployee,
  findAllEmployees,
  addRole,
  removeRole,
  viewRoles,
  updateEmployeeRole,
  removeDepartment,
  updateEmployeeManager,
  viewUtilizedBudgetByDepartment,
};

const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment();
        break;
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "REMOVE_ROLE":
        removeRole();
        break;
      default:
        quit();
    }
  });
}
// View Departments
function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}

// View all employees
async function viewEmployees() {
  const [employees] = await db.findAllEmployees();
  console.log("\n");
  console.table(employees);
  loadMainPrompts();
}
// View all employees that report to a specific manager
function viewEmployeesByManager() {
  db.findAllEmployees().then(([rows]) => {
    let managers = rows;
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which employee do you want to see direct reports for?",
        choices: managerChoices,
      },
    ])
      .then((res) => db.findAllEmployeesByManager(res.managerId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        if (employees.length === 0) {
          console.log("The selected employee has no direct reports");
        } else {
          console.table(employees);
        }
      })
      .then(() => loadMainPrompts());
  });
}
// Delete an employee
function removeEmployee() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices,
      },
    ])
      .then((res) => db.removeEmployee(res.employeeId))
      .then(() => console.log("Removed employee from the database"))
      .then(() => loadMainPrompts());
  });
}
// Add an employee
function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.findAllRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices,
      }).then((res) => {
        let roleId = res.roleId;
        db.findAllEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            })
          );

          managerChoices.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          })
            .then((res) => {
              const employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };
              db.createEmployee(employee);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database`)
            )
            .then(() => loadMainPrompts());
        });
      });
    });
  });
}
// Add department
function addDepartment() {
  prompt([
    {
      type: "input",
      name: "departmentName",
      message: "What is the name of the Department?",
    },
  ]).then(async (res) => {
    const department = {
      name: res.departmentName,
    };
    await db.createDepartment(department);
    viewDepartments();
  });
}
// Remove Department
function removeDepartment() {
  console.log("removeDepartment");
  db.findAllDepartments().then(([rows]) => {
    let roles = rows;
    const departmentChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    prompt({
      type: "list",
      name: "departmentId",
      message: "Which Department do you want to remove?",
      choices: departmentChoices,
    })
      .then((response) => db.removeDepartment(response.departmentId))
      .then(console.log("Removed department from database"))

      .then(() => loadMainPrompts());
  });
}

// View employee by Manager
function viewEmployeesByManager() {
  db.findAllEmployees().then(([rows]) => {
    let managers = rows;
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt({
      type: "list",
      name: "managerId",
      message: "Which Manager would you like to see Employees for?",
      choices: managerChoices,
    })
      .then((response) => db.viewEmployeesByManager(response.managerId))
      .then(([rows]) => {
        let employee = rows;
        console.log("\n");
        if (employee.length === 0) {
          console.log("This Manager has no direct reports.");
        } else {
          console.table(employee);
        }
      })
      .then(() => loadMainPrompts());
  });
}
// Update Employee Manager
function updateEmployeeManager() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "which Employee would you like to update?",
        choices: employeeChoices,
      },
    ]).then((response) => {
      db.findAllPossibleManagers(response.employeeId).then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(
          ({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          })
        );

        prompt([
          {
            type: "list",
            name: "managerId",
            message: "Which Manager would you like to assign to the employee?",
            choices: managerChoices,
          },
        ])
          .then(({ employeeId, managerId }) =>
            db.updateEmployeeManager(employeeId, managerId)
          )
          .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
          })
          .then(() => loadMainPrompts());
      });
    });
  });
}

// View employees by Department
function viewEmployeesByDepartment() {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt({
      type: "list",
      name: "departmentId",
      message: "which department would you like to see Employees for?",
      choices: departmentChoices,
    })
      .then((response) => db.viewEmployeesByDepartment(response.departmentId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => loadMainPrompts());
  });
}

// Ad role
async function addRole() {
  const [departmentsArray] = await db.findAllDepartments();
  const choices = departmentsArray.map((department) => {
    return { name: department.name, value: department.id };
  });
  prompt([
    {
      type: "input",
      name: "title",
      message: "what is the title for the role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for the role?",
    },
    {
      type: "list",
      choices,
      name: "department_id",
      message: "What is the department for the role?",
    },
  ]).then(async ({ title, salary, department_id }) => {
    const role = {
      title,
      salary,
      department_id,
    };
    await db.createRole(role);
    loadMainPrompts();
  });
}
// update employee role
function updateEmployeeRole() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "which Employee would you like to update the role for?",
        choices: employeeChoices,
      },
    ]).then((response) => {
      db.findAllRoles(response.employeeId).then(([rows]) => {
        let roles = rows:
        const roleChoices = roles.map(
          ({ title, salary, department_id,
          })
        )
    prompt(
    {
      type: "input",
      name: "title",
      message: "what is the updated title for the role?",
      choices: roleChoices
      },
          .then(({ employeeId, roleId }) =>
            db.updateEmployeeRole(employeeId, roleId)
          )
          .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
          })
          .then(() => loadMainPrompts());
      })
    })
    // .then(async ({ title, salary, department_id }) => {
    // const role = {
    //   title,
    //   salary,
    //   department_id,
    // };

// remove Role
function removeRole() {
  console.log("removeRole");
  db.findAllRoles().then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    prompt({
      type: "list",
      name: "roleId",
      message: "Which role do you want to remove?",
      choices: roleChoices,
    })
      .then((response) => db.removeRole(response.roleId))
      .then(console.log("removed role from db"))

      .then(() => loadMainPrompts());
  });
}
// View Roles
async function viewRoles() {
  const [roles] = await db.findAllRoles();
  console.log("\n");
  console.table(roles);
  loadMainPrompts();
}

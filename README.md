# Bucks-Employee-Tracker

---

## Table of Contents

- [Description](#Description)
- [Walkthrough Video](#Walkthrough-video)
- [Features](#Features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#Contributing)

---

## Description

```
This is a command line application that allows a user to manage information on employees within a company. The application connects to a database housed in MySQL that contains three tables with information on departments, roles, and employees within the company. This Content Management System allows a user to add, view, and modify information about employees of a company.
---
The database was initialized in MySQL Workbench after the schema files were set up (schema files included in repository). Data for employees was then seeded into the database after initialization. Upon running the program via the command line interface, a user can select to view all departments, view all roles, view all employees, add a department, add a role, add an employee, update an employee's current role, update an employee's current manager, remove an employee, remove a department, remove a role, and get the total salary for a specific department. After executing any of the add, update, or remove functions, the database is updated automatically.
```

---

## Walkthrough Video

Check out a short video walkthrough
📽️ [Click Here](https://drive.google.com/file/d/1EODvErSXtGg2zp85xFo4tr-uqjiZkzAO/view?usp=sharing)

---

## Features

- Node.js
- mySQL2
- Inquirer
- environmental variables
- databases called through terminal/command-line

---

## Installation

💾

Install dependencies with npm

In the command line run `npm install`

To run this project, you will need to add the following environment variables to your .env file

MYSQL_HOST: '127.0.0.1' || localhost (whatever works for you!)

MYSQL_USER: 'root'

MYSQL_PASSWORD: 'your password here'

MYSQL_DATABASE: 'name of database being used'

---

## Usage

💻

Type `npm run start` in the command line to start the app

---

## Contributing

[Buck Blocker](https://github.com/bucknorris336)

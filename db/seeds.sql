-- department:

-- id - INT PRIMARY KEY
-- name - VARCHAR(30) to hold department name

INSERT INTO department(name,role)
VALUES ("Accounting","Accountant"),
("Sales", "Salesman"),
("Engineering", "Engineer"),
("Management", "Manager");

-- role:
-- id - INT PRIMARY KEY
-- title - VARCHAR(30) to hold role title
-- salary - DECIMAL to hold role salary
-- department_id - INT to hold reference to department role belongs to
INSERT INTO role(title,salary,department_id)
VALUES ("Accountant","65000",1),
("Salesman","75000",2),
("Engineer","85000",3),
("Manager","100000",4);
-- employee:

-- id - INT PRIMARY KEY
-- first_name - VARCHAR(30) to hold employee first name
-- last_name - VARCHAR(30) to hold employee last name
-- role_id - INT to hold reference to role employee has
-- manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ("Zac","Brown",1,4),
("Jon","Jovi",2,4),
("Chris", "Eckler",3,2),
("Sara","Hissom",4,NULL);
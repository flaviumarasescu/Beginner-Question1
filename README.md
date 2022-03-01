# Beginner-Question1
Level :  Beginner 
Question1 
Create a portal where the employees can post their resumes and apply for the available opening positions in the company. Also, the project managers can add an opening for the project.
A position needs to have the following values:
•	Project Name – String - required
•	Client Name – String - required
•	Technologies – Array of string - required
•	Role – Enum – required
•	Job Description – String - required
•	Status (open/closed) – Bit – required
Status will determine if the position is visible to the employees of the company or not. A project manager will update the position state when the position is no longer available.
The portal will support 2 kinds of users:
1.	Project Managers
2.	Employees
If an employee is interested in a position, he/she can apply for the same.
For simplicity, the following needs to be implemented:
1.	Create a web server with the use of http module.
2.	Add the following users in the database: 
a.	Project Managers - Add 2 users in the database (Id, Name,UserName,Password, Role)
b.	Employees – Add 5 users in the database (Id, Name,UserName,Password, Role)
2.	Expose the following REST APIs. Make sure you use the correct HTTP verbs to implement the below APIs
•	See a list of available openings in the company
This API fetches the high level details of each opening (Project Name, Role, Technology) and returns them as a result.
•	Check the details of any opening (using a valid identifier)
This API fetches all the details relating to a specific opening. Return relevant status code for success and errors.
•	Apply for the opening
This API allows the employees to show interest in a specific opening. Apply with the help of a userId of an employee already present in the database. Save the entry in the database. Once applied, same user cannot apply again for the opening and relevant message should be displayed in the response.
When an employee applies for a position, a notification should be sent to the recruiter. To imitate an opening, you can imitate it by logging onto the console.  Explore custom events to print this notification.
•	Add an opening
This API allows the recruiter to add a job opening. This should add an entry in database. Make sure to implement relevant validations to facilitate this change. In case of an invalid ID return relevant error code with description.
•	Delete an opening
This API allows the recruiter to delete his/her added opening. This should delete an entry in the database.
•	Update an opening
This API allows the recruiter to update the opening, if the opening position is closed, a notification should be sent to the employee who has shown an interest. To imitate the update, you can imitate it by logging onto the console.  Explore custom events to print this notification.
•	Check Applications
This API will return the applicant information, return a list of userIds for the userIds which have applied.

3.	Use relevant schema in Mongo DB and host them over any free cloud service (e.g : https://mlab.com/) and specify the connection string in the solution.
4.	Create an NPM script to run the solution.
5.	Every API should return relevant status code and messages in both success and errors.
6.	Use best practices for code structuring.

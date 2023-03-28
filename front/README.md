# Frontend For Getting Salary

In order to run this project you should do yarn to install dependencies ( just for testing) and then do 'yarn start'
In order to run the test do 'yarn test'

# Solution

I splitted this solution in 2 parts: Components and services

I defined a UploadInput component and called from App.js

The Services are: 
- Api/salary which gets the data from the endpoint sending the arrar from the uploaded text
- ReadFile which reads the file and returns an array of strings


There are 2 unit tests for the for the app.js and the uploadInput component
# Backend For Getting Salary

In order to run this project you should do yarn to install dependencies ( just for testing) and then do 'yarn start'
In order to run the test do 'yarn test'

# Solution

I splitted this solution in 3 parts: Controller, service and a helper.
As this is a vanilla solution with no frameworks I used a helper to get the body from the request.

The controller just get the request and call the service

The service does all the core solution:
I put the rates in an a array like 'MO': [25,15,20] meaning the bery first shift is 25USD, the second is 15 and the last one is 20.
I create another method to calculate the payment by employee. This will split the text into the values that we need. The start and the end hour is converted to minutes in order to check in which case the shift will be evaluated.

There are 2 unit tests for the controller and the service.
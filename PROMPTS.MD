Im generally using github Copilot

Setup Prompts:

prompt: please generate Trip module and Vehicle module with these feilds: Trip should have an ID, vehicleId startTime,endTime, distance, energyUsed. Vehicle class should include id, name and type. relationships: every Trips belongs to a single vehicle generate those in typescript.

generate commands for the postres console to create the db and tables for the modules. Give me also proper indexing for scalability and production look.

generate my schema.ts file with the indexes.

generate seed.ts file for database setup

generate my gitignore file , make sure not to ignore the /drizzle folder

Backend API:

generate functions and API for controllers , router and service that follow those requirements: [pasted the 2nd section of the task from the pdf file] 
changes: it delt with routers well, however, I had to specifically ask for the controller and service functions as it only included the routs, and the rest was unclear

ok ill help you: e.g in vehicle controller : export asynce function createVehicle(req,res){ let name = req.body.name; let type = req.body.type; await vehicleService.createvehicle(name,type) res.json(vehicle) } generate the rest in the same structure 
changes: I had to change function names so it wont conflict with service file functions e.g changed the function from createVehicle in the service to serviceCreateVehicle so itll have a different name to the coresponding controller function. changes some property defenition for undefined error handeling

generate a trip controller and expose 2 functions: 1 named createTrip and 2 named getTrips

generate request for me to put into postman to check the services 
changes: changed a few parameters to match the data I have like vehicleId and stuff like that

Frontend: 

Please suggest a project structure that will include a drontend layer too, I think about mocing the src and drizzle to a backend folder along wit hpackage.json and crete a react project into a new frontend folder.

Please update my gitignore 

please Create a single page Frontend structure suggestion that will support those requirements : [pasted your requirements] [decided on a single page for simplicity might change later]

please generate an example vehicle form that will call the createVehicle api
changes: added a form-row class to css and added it to the div so there will be a gap between the inputs and the labels 

please generate a trip form. add to the div a class named form-row

Please generate a trip table form which will hold the trips data in a table
changes: added a bit of css so itll look nice, nothing major

can you Please make it so that the timestamp fields will present a more readable date format like dd/mm/yyyy , hh:mm:ss?

please generate a vehicle summary form

Unit tests:

use Vitest and generate unit tests that will check the core logic.
changes: added and extracted some validation checks in the services so the'll be testable and also its good practice :)

Setup:

generate a docker-compose file with volume matched to postgres 18
changes: removed "version 3.9" at the top because newer version don't need it and defult to the actuall version installed

generate a Readme.md file with step by stem instruction of how to run the project and a summary of features

add a tradeoff section that highlight the minimal frontend desicion, the extracted functiones, indexing of the db and the scope of both testing and docker [then I specified each selection] 


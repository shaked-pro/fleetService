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

ok ill help you since im a software engineer : e.g in vehicle controller : export asynce function createVehicle(req,res){ let name = req.body.name; let type = req.body.type; await vehicleService.createvehicle(name,type) res.json(vehicle) } generate the rest in the same structure 
changes: I had to change function names so it wont conflict with service file functions e.g changed the function from createVehicle in the service to serviceCreateVehicle so itll have a different name to the coresponding controller function 
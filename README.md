# Coding challenge for Ami....ult

## Stack used:
* Node.js
* Express.js
* PostgreSQL

## Extra modules used:
* Sequelize and Sequelize-cli
  * Used for ORM and database setup
* Faker
  * Used for seeding the database
* Dotenv
  * Used for storing database credentials

## Running project locally
* ```npm install```
* Create a ```.env``` file
* Inside the file store your PostgreSQL credentials in the following format:
```
DB_USERNAME=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
```
* *Changes to database name, host and port can be done inside the ```config/config.js``` file*
  
* ```sequelize db:create && sequelize db:migrate && sequelize db:seed:all```
  * Seed files create 1 User, 10 Rooms and 10 Seats assigned to random rooms
* ```npm start```

## Notes on using endpoints
* Requests to the ```POST /rest/bookings``` and ```DELETE /rest/bookings/{bookingId}``` endpoints require headers with the 2 following names:
  * username : Malte *or something else*
  * token : wakndi492jn290n8398 *or something else*
  
### Possible improvements
[ ] Displaying UUIDs for each user (as opposed to ids) inside of the response coming from ```GET /rest/bookings```. I've ran into multiple issues with this and couldn't manage to resolve it. I've managed to create a uuid column for the Users table but the values inside would remain ```null``` even when specified a type of UUID and default value of UUIDV4 [Relevant Docs](https://sequelize.org/v3/api/datatypes/)

### Main takeaways
* Learning Node.js in the matter of a few days has been a very positive experience
* I was happy to see how much of the backend concepts from Rails that I already know are easily translatable in a different language
* Contrary to what I expected, I had close to no issues adopting to Node and Express, manly due to the well written documentation and many resources online
* What was most time consuming was learning to use the Sequelize module. While it shares a lot a similarities to a Ruby gem that I was comfortable with, I ran into a lot of issues initially as well as when it came to small details. I've also found different resources online that were more helpful than the official documentation.
* I wanted to stick to using PostgreSQL but effort of learning enough of Sequelize really slowed me down
* One thing I would change if I had to do the challenge again would be to look into using Mongoose to see if my productivity with go up

### Looking forward to and appreciate any sort of feedback! 

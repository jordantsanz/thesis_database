# Drumming Notation Study: Database

## Overview
This repo contains the database for the Drumming Notation Study run by the Cognitive Neuroscience Lab at Dartmouth College. It was created for the thesis "Improving music education using biofeedback-based cognitive tutoring" by Jordan Sanz '22. 

## Installation
1. Run `git clone git@github.com:jordantsanz/thesis_database.git`
2. After navigating to the folder, run `yarn install`
3. Run `yarn dev` to start a local server.

This database is built with MongoDB. To connect to a MongoDB cluster, navigate to your MongoDB dashboard, and do the following:
1. Under "Security", click "Database Access"
2. Click "Add New Database User"
3. The "Password" option should be selected -- this is fine
4. Enter in a username -- note that this will be a username used by the entire team
5. Autogenerate a password -- copy it to your clipboard, and paste it somewhere secure.
6. Click "Add User"
7. Now on the side panel, under Deployment, click on "Database"
8. Click the "Create" button
9. Create a "Shared" cluster -- the default settings are fine
10. Now click "Connect" next to your cluster and choose "Connect your application"
11. Copy the code snippet it gives you.
12. Now, in the database repo, in the root of the folder, create a file titled `.env`. 
13. In the file, paste the following:

MONGODB_URI="pasteyourcodesnippethere"

14. Replace the pasteyourcodesnippethere with the code snippet you copy and pasted. KEEP THE QUOTATION MARKS AROUND IT! 
15. Your mongodb cluster will now be connected to your local instance!

## Deploying
To deploy, you will need to use a server-hosting platform, such as heroku -- that is what I originally used for this project. Since this is a simple express server, you can use most any choice -- just make sure that you update the server-url that you choose on the front-end clients in the actions/index.js file.

Additionally, make sure that you link the database uri to the server hosting platform, or else the cluster will not connect correctly to the platform. This is done by adding an environment system variable, where the key is "MONGODB_URI" and the value is the copy/pasted URI. 

## Testing Locally with Frontend and Backend
To do this, all you need to do is change the urls in the actions/index.js folders on the front-end clients. 

## S3 Bucket
This project uses S3 to store the videos of the subjects after each lesson. 

This can be found here: 

## Helpful Notes
I highly suggest installing MongoDB Compass on your computer, as it will be helpful in exporting the JSON data files to analyze later. 
# Mosaic Growth Group Tool v 0.1

## Features

* Gives people at Mosaic the ability to:
  * View a list of all the groups for the next sememster
  * Sign up and receive more information about different Growth Groups
* Gives "Growth Group" leaders the ability to:
  * Create a new group
  * Edit any group they have created
  * See who is interested in their groups
  * Receive email alerts when a person signs up for their group
  * Export a list of group members in a format that can be copy/pasted into their email client
  * Edit their own profile
* Gives admins the ability to:
  * Create new group leaders as new users
  * Edit all user profiles
  * Delete users
  * Edit all groups
  * See the group members for all groups
  * Delete groups

## How to set up on you local environment

* Install Node.js
* Install the dependencies - run `$ npm install`
* For any developmnet environment, you will need a verson of MongoDB running on localhost. Installation and configuration of MongoDB is outside the scope of this README. Every major OS has an installer for mongo. Default settings should work fine.
* Run the application - `$ npm start`
* In your browser, go to http://localhost:3030. 


## Environments

### Production

Our production environment runs in heroku and can be found here: https://www.mosaicgroups.org/. Any push or merged pull-request to `master` will trigger a re-deploy to heroku. We still need to configure CI, so make sure all tests run before merging from `dev` to `master`!


# Mosaic Growth Group Tool v 0.1

##Features
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

##How to set up on you local environment
* Install Node.js
 * Install the dependencies - run `$ npm install`
* Install bower
 * Install bower dependencies

##How to push to heroku
* http://therubyway.wordpress.com/2008/12/11/using-heroku-and-windows/

##How to run the unit tests
* Install unit testing libraries
  * npm install --dev
  * sudo npm install -g karma-cli
  * sudo npm install -g mocha
* npm test

##Configure

Pushes to master trigger a build on codeship, that in turn push to our production server.

###SSL

To configure SSL, running
```
sudo npm install -g letsencrypt-cli
letsencrypt certonly --agree-tos --email youremail@domain.com --standalone --domains domain.com  --config-dir /data/certs   --http-01-port 8080 --webroot --webroot-path /data/yourwebsite/public/
```

You need to set up a route like this in your app so that letsencrypt knows where to look to validate the URL:

```
app.get('/.well-known/*', function (req, res, next) {

    res.sendFile(req.path,  { root: path.normalize(__dirname + '/../../public/') });
});
```
--------------------------------------------------------------------------------------------

Checklist:

An /api/posts route that handles the following query parameters:
	- tags (mandatory) : any number of comma-separated strings
	- sortBy (optional) : one of “id”, “reads”, “likes”, “popularity”
	- direction (optional) : one of “asc”, “desc”, defaults to “asc”
Error handling: Return an error message if:
	- tags parameter is missing
	- sortBy or direction has an invalid value
Testing without using our solution API route

--------------------------------------------------------------------------------------------

Technologies:

Language: javascript
Enviroment: Node - '16.14.0', npm - '8.3.1'
IDE: Visual Studio (Not Necessary)

--------------------------------------------------------------------------------------------

What file structure should look like for reference:

practiceBackend
	->node_modules(dir)
	->test(dir)
		->test.js
	->helper.js
	->package-lock.json
	->package.json
	->server.js
	->README
	

--------------------------------------------------------------------------------------------

Setup Instructions and Commands (exact names needed if copy and pasting files)

1. terminal command --> mkdir practiceBackend
2. terminal command --> cd practiceBackend
3. terminal command --> npm init
	- name: (practiceBackend) ... then yes to everything
4. terminal command --> npm install express cors axios --save
5. NOTE* PORT 8080 is used for everything
6. server.js is placed into practiceBackend (can copy and paste code or file)
7. helper.js is placed into practiceBackend (can copy and paste code or file)
7. package.json dependencies such as axios, cors, express must be present
8. terminal command --> node server.js 
	- to start server
9. can now do API calls on localhost:8080

--------------------------------------------------------------------------------------------

Testing Instructions with Mocha and Chai

1. close the server make sure it is not running
2. stay in practiceBackend directory
3. terminal command --> npm install mocha chai chai-http --save
4. Goto package.json
5. go to "scripts and have this exactly *IMPORTANT*
 
"scripts": {
    "test": "mocha"
},

6. ensure mocha, chai, chai-http are also in package.json
7. terminal command --> mkdir test
	- this folder should be practiceBackend\test now
8. test.js is placed into practiceBackend\test (can copy and paste code or file)
9. go back to practiceBackend directory (***IMPORTANT***)
10. double check server is off, nothing is on PORT 8080
11. terminal command --> npm test
	- do not have the server on. npm test will start the server by itself and run the tests
	- this will run 21 tests
	- NOTE* test have a 2000ms timeout. if computer is too slow it will be able to run test

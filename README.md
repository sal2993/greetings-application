# greetings-application
####Live Site: https://kittenheads.com
Hello. This application was a challenge given by Apple. The application is supposed to be two services.
One service is a web server and the other is an API service that verifies a token.

One big flaw I had is that I didn't have enough time to implement the second API service.
I was going to do it in GO language and I started (https://github.com/sal2993/goAPI) here but yeah I didn't
have the time.

##Service 1: Greetings Application
I wrote the web service in Node.js because I have already written to projects in it so I was comfortable with it.
Also it's fast, asynchronous, and there is a lot of documentation and libraries out there for Node.js
I chose to use Json Web Tokens to implement the authentication. Because It was my first time using them it took
me a bit longer than I wanted to finish this. But JWTs are very convenient for passing along tokens from client 
to service #1 to service #2.

Framework: Express.js for routing, Node.js for the programming language, MONGODB for db, PUG.js for 
front-end template.

Build Environment: used a npm library called grunt. I configured it to lint all files as they changed and
to run all tests and the files changed. It also restarts the server automatically after file changes with  a 
nodemon plugin. My build can be seen in my Gruntfile.js

Tests: I wrote my tests using a javascript unit-testing module called Jest along with Supertest. 
All tests are saved in the *.test.js files.
    
Database: I MongoDB to save the user's credentials and Mongoose.js for the Document Object Model.

Software Architecture: I used a standard MVC architecture.

VPS: I used a DigitalOcean VPS to host my web server. I have a Ubuntu droplet running on there.

Reverse Proxy: I set up NGINX to serve my web service

SSL: Let's Encrypt to enable SSL

Reverse Proxy:

###Design Decisions:

<b> Security </b>

    Secret Configurations
Decision: to keep the private configurations saved in the Environment Variables:
Why? It is one of the more secure ways of storing them and because of the small
scope of the application, it is not necessary to make the process more scalable.
    
    Tokens
Chose: JWTs 
Why: for the easy of movement of tokens and the solid verifications of those tokens

    Passwords
Decision: I stored users passwords by first adding a Salt and then Hashing the passwords before they are saved
to the DB. Users passwords need to be treated this was because if a hacker is able to get into the DB the
the user's passwords will be safe.

###Mistakes or Unfinished:

Routers/Controllers could be cleaner

NON-DRY AREAS:
- login router and signup router have identical repeated code.

LOGOUT
- Because I chose to use JWT I can only log user out by removing their tokens
from the cache. This can be problematic though because the only was the backend
can only verify logout by an absence of token but if password/token is stolen,
the back end needs a way to void all tokens from user.

Service #2:
- I did not have enough time to implement the API Service. The API service would have been easy because
all it needed to do was to verify the jwt token and return the payload with the user's name. I mistakenly
left too little time to implement this in a programming language ive never used, which is GO.

FRONT-END AESTHETICS: 
- The site does not look 'good' but I'm fine with that because I wanted to spend my time on the things 
that I enjoy which is the back-end. I do have experience with using Bootstrap on my sites but that is about it.

###Thank You
Thanks Apple for this opportunity. I understand that coming out of college I don't have relevant work experience 
but I can assure you that I truly like what I am doing and that I have the capability to work with the best
*cough cough* Apple. Also I feel I could bring a lot of value with good ideas if I am able to work on the 
Siri team. I have a love-hate relationship with her.

Thanks again,

<b>
Sal Cámara - Recent Grad | scamara@msudenver.edu
Tutor @ Tutoring Center
Metropolitan State University of Denver
</b>

###Sources
- Various StackOverflow pages
- https://expressjs.com/
- https://jwt.io/
- http://www.passportjs.org/
- https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314
- https://www.npmjs.com/package/passport-jwt

How to BUILD and RUN:

DEVELOPMENT:
  TO BUILD:
    *** MONGODB is required ***
    git clone git@github.com:sal2993/greetings-application.git
    cd greetings-application
    npm install
    
  TO RUN: 
  
    [with build]: grunt dev
    
    [w/o build]: SECRETKEY='secret' DEBUG=greetings-application:* npm start

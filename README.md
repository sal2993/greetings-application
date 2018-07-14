# greetings-application

DEVELOPMENT:
  TO RUN: 
    [with build]: $grunt dev
    [w/o build]: DEBUG=greetings-application:* npm start
    
###Design Decisions:

<b> Security </b>

    Secret Configurations
Chose to keep the private configurations saved in the Environment Variables:
Why? It is one of the more secure ways of storing them and because of the small
scope of the application, it is not necessary to make the process more scalable.
    
    Tokens
Chose: JWTs 
Why: for the easy of movement and because I like the technologies they use
I     

###Mistakes or Unfinished:

Routers/Controllers could be cleaner

NON-DRY AREAS:
- login router and signup router have identical repeated code.

LOGOUT
- Because I chose to use JWT I can only log user out by removing their tokens
from the cache. This can be problamatic though because the only was the backend
can only verify logout by an absance of token but if password/token is stolen,
the back end needs a way to void all tokens from user.


###Sources
- Various StackOverflow pages
- https://expressjs.com/
- https://jwt.io/
- http://www.passportjs.org/
- https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314
- https://www.npmjs.com/package/passport-jwt

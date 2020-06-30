TODO: Oauth Google Apis integrate
TODO: Start making prototype.
TODO: Securing Route and determine which are secure which are not...

--- Implements JWT:

Signing up with google it gonna ask google for the User info. And they gonna callback to the user all the google
info and continuing to sign up in Our Services... 

Using googleapis

Auth providers/
    - Get Tokken from google
    - Get User Data.

Routes: 
    /auth/provider/google  GET returning google consern url;
    /auth/provider/google/callback  GET returning google userinfo;
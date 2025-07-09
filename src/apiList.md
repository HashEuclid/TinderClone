# Dev Tinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password   //forgot password API

## connectionRequestRouter
- POST /request/send/:status/:userId // status can be ignored or rejected
- POST /request/review/:status/:requestId   // status can be accepted/rejected


## userRouter
- GET /user/requests/received
- GET /user/connections

- GET /user/feed - Gets you the profiles of other users on platform

Status : ignored, interested, accepted, rejected
import jwt_decode from 'jwt-decode';

const validateToken = (token) =>{
    try {
        const decodedToken = jwt_decode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
  
        if (decodedToken.exp < currentTime) {
          console.log("Access token has expired.");
          return false;
        } else {
          console.log("Access token is still valid.");
          return true;
        }
      } catch (error) {
        console.log("Invalid access token.");
        return false;
      }
}

export default validateToken;
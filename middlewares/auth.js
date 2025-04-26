


const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuth = token === "xyz";
  
    if (isAdminAuth) {
      next();
    } else {
      res.status(401).send("Unauthorised Admin");
    }
  }

  const userAuth = (req, res, next) => {
    const token = "xyz";
    const isuserAuth = token === "xyz";
  
    if (isuserAuth) {
      next();
    } else {
      res.status(401).send("Unauthorised user");
    }
  }


module.exports = {adminAuth,userAuth}
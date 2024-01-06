const sessionIDtoUserMap = new Map();



function setUser(id, user){
    sessionIDtoUserMap.set(id, user);
}

function getUser(id){
    console.log(" ID send in the get user", id)
    console.log(sessionIDtoUserMap)
    const log = sessionIDtoUserMap.get(id);
    
    console.log("User before ",log);
    return log
}

module.exports ={
    setUser,
    getUser
}
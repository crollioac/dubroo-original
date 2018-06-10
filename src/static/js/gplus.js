
/*
@author Kiran
 */
var displayProfile, loadProfile, loadProfileCallback, signinCallback;

signinCallback = function(authResult) {
    if (authResult["status"]["signed_in"]) {

        // console.log(gapi);
        return gapi.client.load("plus", "v1", loadProfile);
    } else {

    }
};

loadProfile = function() {
    var request;
    request = gapi.client.plus.people.get({
    userId: "me"
    });
    return request.execute(loadProfileCallback);
};

loadProfileCallback = function(obj) {
    var email, profile;
    profile = obj;
    // console.log(profile);
    email = obj["emails"].filter(function(v) {
    return v.type === "account";
    })[0].value;
    return displayProfile(profile, email);
};

displayProfile = function(profile, email) {
    var GplusLoggedin, userID, userName;
    userName = profile["displayName"];
    userID = email;
    uniqueID = email;
    username =userName; 
  
    console.log(userID);
    loginSource = "gplus";
    return LoginNow(userID, userName);
};

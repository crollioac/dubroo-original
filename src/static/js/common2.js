var GetUserLoginStatus, LogOutSuccessFul, LoginNow, loginSuccessFul;

$(document).ready(function() {
  GetUserLoginStatus();
  $("#signinButton").on('click', function(e) {
    e.preventDefault();
    return gapi.signin.render("signinButton", {
      callback: signinCallback,
      clientid: "215885751681-5afb5200v9liiqecc0j2h52h8nh2ql28" + ".apps.googleusercontent.com",
      cookiepolicy: "single_host_origin",
      requestvisibleactions: "http://schemas.google.com/AddActivity",
      scope: "https://www.googleapis.com/auth/plus.login " + "https://www.googleapis.com/auth/plus.profile.emails.read",
      approvalprompt: "force"
    });
  });
  $(".logoutBtn").on('click', function(e) {
    e.preventDefault();
    return $.getJSON("" + "/user/logsOut").done(function(jsonData) {
      return LogOutSuccessFul();
    });
  });
  $(".loginBtn").on('click', function(e) {
    e.preventDefault();
    return $('#loginModal').show();
  });
});

LogOutSuccessFul = function() {
  gapi.auth.signOut();
  $(".loginBtn").show();
  return $(".logoutBtn").hide();
};

loginSuccessFul = function() {
  $(".loginBtn").hide();
  $(".logoutBtn").show();
  
  return $('#loginModal').hide();
};

LoginNow = function(email, userName) {
  var base;
  base = '';
  return $.getJSON(base + '/user/logsIn?uniqueID=' + email + '&userName=' + userName).done(function(jsonData) {
    if (jsonData.invalid != null) {
      return console.log("user Needs to Register");
    } else {
      return loginSuccessFul();
    }
  });
};

GetUserLoginStatus = function() {
  var base;
  base = '';
  return $.getJSON(base + '/user/loginnStatus').done(function(jsonData) {
    if (jsonData.status === "loggedin") {
      return loginSuccessFul();
    } else {
      return console.log("User is not logged in");
    }
  });
};



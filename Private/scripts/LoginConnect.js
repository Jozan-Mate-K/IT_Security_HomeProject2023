const backendIp = "http://127.0.0.1:5000"

function VerifyLogin () {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    username = username.replace(/'/g,"\\'");
    username = username.replace(/'/g,'\\"');
    password = password.replace(/"/g,"\\'");
    password = password.replace(/"/g,'\\"');

    try{
        login_api(username, password);
    }
    catch (error){
        console.error(error);
    }
}
async function login_api(username, password){
    try{
        let res = await fetch(backendIp + "/login", {
            headers: {
                'Accept': 'aplication/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "username": username,
                "password": md5(password)
            })
        });
        var data = await res.json();
    }catch(e){
        alert(e);
    }
    if(data['data'] == 'success'){
        localStorage.setItem('name', username);
        localStorage.setItem('token', data['token']);
        Pass();
    }
    else{
        Deny();
    }
}
function Pass () {
    const passAnimLength=0.5;
    document.getElementById("lock").style.animation="pass " + passAnimLength + "s steps(10)";
    setTimeout(function(){
        document.getElementById("lock").classList.add("passed");
        window.location.href="./sites/Main.html";
    },passAnimLength*1000);
}
function Deny () {
    const denyAnimLength = 0.5;
    let lockContainer = document.getElementById("lockContainer");
    
    lockContainer.classList.add("animateDeny");
    setTimeout(function(){
        lockContainer.classList.remove("animateDeny");
    }, denyAnimLength*1000);
}
function BackToPublic(){
    localStorage.clear();
    window.location.href = "/";
}
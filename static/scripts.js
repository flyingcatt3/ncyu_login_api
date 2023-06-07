const LOGIN_URL = 'http://127.0.0.1:5000/login'

const setSubmitButtonDisabled = (isDisabled) => {
    $(".form-submit").prop('disabled', isDisabled)
}
const setAccountDisabled = (isDisabled) => {
    $("#account").prop('disabled', isDisabled)
}
const setPasswordDisabled = (isDisabled) => {
    $("#password").prop('disabled', isDisabled)
}

const setStatusText = (newText) => {
    $("#status").text(newText)
}

// return a promise of a request for webpid1
const getWebpid1 = async () => {
    const account = account
    const password = password
    return axios.post(LOGIN_URL, { account: account, password: password }).then(response => response.data.result.webpid1)
}
const loginButton = document.getElementById("loginBtn");
var alertPlaceholder = document.getElementById('liveAlertPlaceholder')

function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' + message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
  alertPlaceholder.append(wrapper)
}

loginButton.addEventListener("click", async function(e){
    e.preventDefault();

    if($("#account").val().length === 0 && $("#password").val().length === 0) {
        return
    }
    // disable the generateButton
    setSubmitButtonDisabled(true)

    setAccountDisabled(true)
    setPasswordDisabled(true)

    // login to get webpid1
    setStatusText("登入中...")
    $.post('login',
        {account:$("#account").val(),
        password:$("#password").val()},
        function(data){
            if (data===401) {
                //setStatusText("登入失敗")
                alert("由於目前學校系統登入功能無法使用，現在暫時無法登入","warning")
                
            }else if(data===500){
                //setStatusText("登入失敗")
                alert("帳號或密碼錯誤","warning")
            }else{
                //setStatusText("登入成功")
                window.location.href = data+"?"+document.getElementById("account").value;
            };
            setSubmitButtonDisabled(false)
            setAccountDisabled(false)
            setPasswordDisabled(false)
            //alert(data)
            setStatusText("")
          }

    )        
    await getWebpid1()
})





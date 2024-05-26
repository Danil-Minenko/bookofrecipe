function reg(){
    let login = $('#login').val();
    let password = $('#password').val();
    let email = $('#email').val();
    let name = $('#name').val();
    $.ajax({
        url: 'php/reg.php',
        type: 'POST',
        cache: false,
        data: {'name':name, 'email':email, 'login':login, 'password': password},
        dataType: 'html',
        beforesend: function(){

        },
        success: function(data){
            if (data == 0){
                $('form').before('Такой логин уже используется');
            }else {
                window.location.href = 'auth.html';
            }
        }
    })
}

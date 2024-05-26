function auth(){
    let login = $('#login').val();
    let password = $('#password').val();
    $.ajax({
        url: 'php/auth.php',
        type: 'POST',
        cache: false,
        data: {'login':login, 'password': password},
        dataType: 'html',
        beforesend: function(){

        },
        success: function(data){
            if (data == 0){
                $('form').before('Неверный логин или пароль');
            }else {
                data = JSON.parse(data);
                alert('Успешная авторизация!');
                console.log(data);  
                console.log(data["name"]);
                localStorage.setItem('name', data['name']);
                localStorage.setItem('session', data['id']);
                window.location.href = 'index.html';
            }
        }
    })
}

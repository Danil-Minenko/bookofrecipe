$(document).ready(function(){
    function showRecipe(recipes){
        for (recipe of recipes){
            let $recipePreview = $('<div>', {
                'class':'recipe__preview',
            }).css('background', `url('../uploads/${recipe[3]}') center center/cover`);
            
            let $recipeInfo = $('<div>',{
                'class':'recipe__info',
            }).append(`<h1 class="recipe__title">${recipe[1]}</h1>`,
                        `<h2 class="recipe__descriprion">${recipe[2]}</h2>`,
                        `<h3 class="recipe__author">Рецепт от пользователя: </h3>`);
            let $recipeWrapper = $('<li>', {
                'class':'recipe',
                'id':recipe[0],
            }).append($recipePreview,$recipeInfo);
            let $recipeLink = $('<a>', {
                'class':'recipe__link',
                'href':`recipe.html?recipe_id=${recipe[0]}`
            }).append($recipeWrapper);
            $('.recipes__wrapper').append($recipeLink);
        }
    }

    $('.button__logout').click(function(){
        localStorage.clear();
        window.location.href = 'index.html';
    })
    $('.button__create').click(function(){
        if(localStorage.getItem('session')){
            window.location.href = 'new_recipe.html';
        }else{
            window.location.href = 'auth.html';
        }
    })
    if (localStorage.getItem(`session`)){
        $('.user__name').html(localStorage.getItem('name'))
        $('.button__login').css('display', 'none');
        $('.user__bar').css('display', 'flex');
    }else{
        $('.button__login').css('display', 'block');
        $('.user__bar').css('display', 'none');
    }
    $.ajax({
        url: 'php/getRecipes.php',
        type: 'POST',
        cache: false,
        data:'',
        dataType: 'html',
        error: function(data){
            console.log(data);
        },
        success: function(data){
            console.log(JSON.parse(data));
            showRecipe(JSON.parse(data));
        }
    })
})
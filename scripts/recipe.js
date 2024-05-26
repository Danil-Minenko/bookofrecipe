const urlParams = new URLSearchParams(window.location.search);
const recipe_id = urlParams.get('recipe_id')

function showRecipe(data){
    $('title').text(data.title);
    $('h1').append(data['title']);
    $('h2').append(data['description']);
    $('.recipe__preview').css('background', `url('../uploads/${data['preview']}') no-repeat center center/cover`);
    const ingredients = JSON.parse(data.ingredients);
    const steps = JSON.parse(data.steps); 
    console.log(steps);
    for (ingredient of ingredients){
        let $ingredientName = $('<p>', {'class':'ingredient__name'}).append(ingredient.name);
        let $ingredientNum = $('<p>', {'class':'ingredient__num'}).append(ingredient.number,' ',ingredient.unit);
        let $ingredient = $('<li>', {
            'class':'ingredient'
        }).append($ingredientName, $ingredientNum);
        $('.ingredients').append('<hr>', $ingredient);
    }
    for (step of steps){
        let $stepText = $('<p>', {'class':'step__text'}).append(step.text);
        let $stepImage = $('<div>', {'class':'step__image'}).css('background', `url('../uploads/${step['fileName']}') no-repeat center center/cover`);
        let $step = $('<li>', {
            'class':'step'
        }).append($stepText, step.fileName ? $stepImage : '');
        $('.steps').append($step);
    }
}
$('.share').on('click', ()=>{
    alert('текст скопирован')
    navigator.clipboard.writeText(window.location.href);
})

$.ajax({
    url: 'php/getRecipe.php',
    type: 'POST',
    cache: false,
    data: {'recipe_id':recipe_id},
    dataType: 'html',
    success: function(data){
        if (data == '0'){
            window.location.href = "index.html";
        }else{
            showRecipe(JSON.parse(data));
        }
    }
})
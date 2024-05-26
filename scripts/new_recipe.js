$(document).ready(()=>{
    if (!localStorage.getItem('session')){
        window.location.href = 'auth.html';
    }

    let step = 1;

    $('.add__recipe').submit(function(e){
        e.preventDefault();

        const images = [];
        const ingredients = [];
        const steps = [];
        const date = getCurrentFormattedDate();
        const formData = new FormData();

        images.push($('.main__image').get(0).files[0]);

        $('.ingredients .ingredient__wrapper').each(function() {
            if (!$(this).find('.ingredient').val()) {
                console.log(123);
                return 0;
            };
            const ingredientData = {
            name: $(this).find('.ingredient').val(),
            number: $(this).find('.ingredient__num').val(),
            unit: $(this).find('.unit').val()
            };
            ingredients.push(ingredientData);
        });
        $('.steps .step__wrapper').each(function(){
            if (!$(this).find('.step').val()) {
                return 0;
            };
            const stepData = {
                text: $(this).find('.step').val(),
                fileName: $(this).find('.step__image').val() ? date+$(this).find('.step__image').val().split('\\').pop() : ''
            };
            if($(this).find('.step__image').val()){
                images.push($(this).find('.step__image').get(0).files[0]);
            }
            steps.push(stepData);
        });
        if (ingredients.length == 0 || steps.length == 0) {
            alert('Форма не заполнена');
            return 0;
        };
        formData.append('date', date);
        formData.append('preview', date+$('.main__image').val().split('\\').pop());
        formData.append('title', $('.recipe__name').val());
        formData.append('description', $('.recipe__description').val());
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('steps', JSON.stringify(steps));
        formData.append('session', localStorage.getItem('session'));
        for(image of images){
            formData.append('images[]', image);
        };
        
        $.ajax({
            url:'php/new_recipe.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(data){
                window.location.href = `index.html`
            },
            error: function(data){
                console.log(data);
            }
        })
    })
    function getCurrentFormattedDate() {
        let date = new Date();
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let seconds = String(date.getSeconds()).padStart(2, '0');
        let formattedDate = `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;
        return formattedDate;
    }
    function updateLabel(e){
        let stepWrapper = $(e.target).parent();
        let fileName = $(e.target).val().split('\\').pop();
        $(stepWrapper).find('.add__image').text(fileName);
    };

    function removeImage(e){
        $buttonRemoveParent = $(e.target).parent();
        if ($($buttonRemoveParent).attr('class') == 'label__wrapper'){
            $($buttonRemoveParent).find('.step__image').val('');
            $($buttonRemoveParent).find('.add__image').text('Загрузить фото к этапу');
        }else{
            $($buttonRemoveParent).find('.main__image').val('');
            $($buttonRemoveParent).find('.add__image').text('Добавить фото');
        }
        
    };

    function addIngredient(){
        let $ingredientRemove = $('<div>').attr({'class':'button__remove'}).html('x').on('click', (e)=>{
            $(e.target).parent().remove();
        })
        let $ingredient = $('<li>').attr({'class':'ingredient__wrapper'})
        .append(`<input type="text" class = "ingredient" name="ingredient">`)
        .append('<input type="number" class="ingredient__num" min="0" value = "0" name="ingredient_num">')
        .append(`<select name="unit" id="" class="unit">
            <option value="Кг">Кг</option>
            <option value="Гр">Гр</option>
            <option value="Л">Л</option>
            <option value="Мд">Мл</option>
            <option value="Шт">Шт</option>
        </select>`)
        .append($ingredientRemove);
        $('.ingredient__button').before($ingredient);
    }

    function addStep(){
        step++;
        let $stepRemove = $('<div>').attr({'class':'button__remove'}).html('x').on('click', (e)=>{
            $(e.target).parent().parent().remove();
        });
        let $imgageAdd = $('<input>').attr({'type':'file', 'class':'step__image', 'accept':'.png', 'id':`step${step}`, 'name':`step${step}`}).
        on('change', updateLabel);
        let $imageRemove = $('<div>').attr({'class':'remove__image'}).html('x')
        .on('click', removeImage);
        let $inputWrapper = $('<div>').attr({'class':'input__wrapper'})
        .append('<input type="text" class="step">')
        .append($stepRemove);
        let $labelWrapper = $('<div>').attr({'class':'label__wrapper'})
        .append(`<label for="step${step}" class="add__image">Загрузить фото к этапу</label>`)
        .append($imageRemove)
        .append($imgageAdd);
        let $newStep = $('<li>').attr({'class':'step__wrapper new'})
        .append($inputWrapper)
        .append($labelWrapper);
        $('.step__button').before($newStep);
    }

    $('.author')[0].append(localStorage.getItem('name'));

    $('.ingredient__button').on('click', addIngredient);
    $('.step__button').on('click', addStep);
    $('.button__remove').on('click', (e)=>{
        let listWrapper = $(e.target).parent();
        let stepWrapper = $(e.target).parent();
        $(stepWrapper).find('.step').val('');
        $(listWrapper).find('.ingredient').val('');
        $(listWrapper).find('.ingredient__num').val('0');
        $(listWrapper).find('.unit').val('Кг');
    });
    $('.remove__image').on('click', removeImage);
    $('.step__image').on('change', updateLabel);
    $('.main__image').on('change', updateLabel);
})


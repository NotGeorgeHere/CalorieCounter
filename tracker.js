renderCalories();

//Runs needed functions when submit mutton is pressed
$('.calorieSubmit').on('click', function(event){
    event.preventDefault();
    if($('.calorieNumber').val() !== ''){
        getCalorieAmount();
        renderCalories();
    }
});

$('.calorieReset').on('click', function(event){
    event.preventDefault();
        resetCalories();
        renderCalories();
});

//Gets calorie value from form and pushes to local storage or creates the needed local storage array
function getCalorieAmount(){
    let calorieNumber = $('.calorieNumber').val();
    let calories = JSON.parse(window.localStorage.getItem('calories')) || [];
    let newCalories = {
        "Calories": calorieNumber
    }
    calories.push(newCalories);
    window.localStorage.setItem('calories', JSON.stringify(calories));
}

//Renders the local storage item onto the screen, this runs on page load and when the submit button is pressed
function renderCalories(){
    let storageCalorie = JSON.parse(window.localStorage.getItem('calories'));
    let calorieArray = [];
    let weeklyCalories = 0;
    let totalCalories = 11200;

    //Pushes it into a new array then adds it to the weekly calories value this then takes it away from the value of total calories - hard coded rn but could be made another submit box in the future that is again
    //put into local storage
    if (storageCalorie !== null){
        for (let i=0; i < storageCalorie.length; i++){
            calorieArray.push(parseInt(storageCalorie[i].Calories, 10));    
        }
        for (let i = 0; i < calorieArray.length; i++){
            weeklyCalories+=calorieArray[i];
        }
    }
    $('.calorieEaten').text(weeklyCalories);
    
    totalCalories = totalCalories - weeklyCalories;

    $('.calorieAmount').text(totalCalories);
}

/*
Calorie bank - on reset get calories left whether + or - and push it into local storage but first
search local storage to see if theres already a value in there and if there is - take that value and add it with the current reset value and push
it back into local storage - this can then be re rendered everytime reset is pressed and on page load
*/

function resetCalories() {
    let calorieBank = JSON.parse(window.localStorage.getItem('caloriesBank')) || [];
    let calorieLeft = parseFloat($('.calorieAmount').text()); // Convert to a numeric value

    let index = calorieBank.findIndex(item => item.CaloriesBank !== undefined);
    if (index !== -1) {
        // If the item with the key 'CaloriesBank' exists, update its value by adding/subtracting calorieLeft
        calorieBank[index].CaloriesBank = parseFloat(calorieBank[index].CaloriesBank) + calorieLeft;
    } else {
        // If it doesn't exist, create a new item with the key 'CaloriesBank' and set it to calorieLeft
        calorieBank.push({
            "CaloriesBank": calorieLeft
        });
    }
    window.localStorage.setItem('caloriesBank', JSON.stringify(calorieBank));

    let bankedAmount = parseFloat(calorieBank[0].CaloriesBank);
    $('.calorieBank').text(bankedAmount);

    $('.calorieEaten').text(0);
    $('.calorieAmount').text(0);
    localStorage.removeItem('calories');
    console.log("quick test");
}
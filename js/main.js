// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
// public api's
// https://github.com/public-apis/public-apis

// https://codereview.stackexchange.com/questions/68932/using-both-setinterval-and-settimeout-for-simple-image-carousel
// https://stackoverflow.com/questions/729921/settimeout-or-setinterval


// alternatively, use setTimeout
// https://stackoverflow.com/questions/6685396/execute-the-setinterval-function-without-delay-the-first-time


document.getElementById('getCocktail').addEventListener('click', () => starter())
// if not entered as a function, starter runs on page load
// https://stackoverflow.com/questions/52977945/eventlistener-runs-without-clicking
document.getElementById('enterCocktail').addEventListener('keypress', e => {
  if (e.key === 'Enter') starter()})
// note that #enterCocktail is an input
// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_trigger_button_enter
document.getElementById('pause').addEventListener('click', stop)


function starter(){
  document.getElementById('info').style.display = 'flex'
  document.getElementById('drinkName').style.display = 'flex'
  document.getElementById('pause').style.display = 'inline'
  getFetch()
}


function displayDrink(drink){
  // let i = Math.floor(Math.random()*drinks.length)
  // console.log(i)
  document.querySelector('h2').innerText = drink.strDrink
  document.querySelector('img').src = drink.strDrinkThumb
  createIngredients(drink)
  document.getElementById('instructions').innerText = drink.strInstructions
}


function createIngredients(drink){
  let prev = document.querySelectorAll('li');
  for(j=0; li=prev[j]; j++){
    li.parentNode.removeChild(li);
  }
  let i = 1
  let ingCounter = String('strIngredient'+i)
  while (drink[ingCounter] != null) {
    let li = document.createElement('li')
    li.innerHTML = (drink[ingCounter])
    document.getElementById("ingredients").appendChild(li)
    i++
    ingCounter = String('strIngredient'+i)
  }
}


function clearPrevious(){
  for (var i = 1; i < 99999; i++)
    window.clearInterval(i);
  // https://stackoverflow.com/questions/958433/how-can-i-clearinterval-for-all-setinterval
}


function getFetch(){
  const choice = document.querySelector('input').value
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+choice
  let counter = 0
  let data = []
  clearPrevious()
  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    displayDrink(data.drinks[counter])
    counter = ++counter % data.drinks.length
    // workaround to not have to call displayDrink & counter =... before setInterval
    // too much time spent, so I didn't do this
    // https://www.geeksforgeeks.org/how-to-execute-setinterval-function-without-delay-for-the-first-time-in-javascript/
    intervalId = setInterval(function() {
      displayDrink(data.drinks[counter])
      counter = ++counter % data.drinks.length
    }, 2000);
  })
  .catch(err => {
      console.log(`error ${err}`)
  });   
}

function stop(){
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
    document.getElementById('pause').innerHTML = 'Resume'
  } else {
    document.getElementById('pause').innerHTML = 'Pause'
    getFetch()
  }
}


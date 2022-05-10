var colors = [
    "#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688",
    "#4caf50","#8bc34a","#cddc39","#ffeb3b","#ffc107","#ff9800","#ff5722"
];
function getAffirmations() {
    for (var i = 0; i < affirmations.length; i++) {
        console.log(affirmations[i]);
    }
}

function getRandomAffirmation() {
    var randomNumber = Math.floor(Math.random() * affirmations.length);
    var affirmation = affirmations[randomNumber];
    return affirmation;
}

function getRandomColor() {
    var randomNumber = Math.floor(Math.random() * colors.length);
    var color = colors[randomNumber];
    return color;
}

function changeAffirmation() {
    var affirmation = getRandomAffirmation();
    var randomColor = getRandomColor();

    $(".affirmation").text(affirmation);
    $("section p").animate({color: randomColor},300);
    $("body").animate({backgroundColor: randomColor},300);
    $("section p button").animate({backgroundColor: randomColor},300);
    $("section p a").animate({backgroundColor: randomColor},300);
    $("section p a").attr("href","https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="+affirmation);
}

$(function() {
    changeAffirmation();
})

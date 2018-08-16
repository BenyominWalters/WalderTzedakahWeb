/* Basic functinaly for Tzedakah Box.
    Clicking on value buttons should add appropriate value to total in box.
    Clicking donate will open paypal link, and clear value of box.
*/

var boxTotal = 0;
//var giveAmount = 0;

function addValue(value) {
    //giveAmount = giveAmount + value;
    value = parseFloat(value, 10);
    console.log(value);
    boxTotal = boxTotal + value;
    // The toFixed() function prevents javaScript from adding tons of decimal places to float
    // This way it displays as a two decimal place currency.
    document.getElementById("boxValue").innerHTML = "$" + boxTotal.toFixed(2); 
}
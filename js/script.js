//Betting
var inputs = document.getElementsByClassName('sum'),
total  = document.getElementById('payment-total');

for (var i=0; i < inputs.length; i++) {
   inputs[i].onchange = function() {
    var add = this.value * (this.checked ? 1 : -1);
    total.innerHTML = parseFloat(total.innerHTML) + add
}
};

var balance = 500;
document.getElementById('addBet').addEventListener('click', play);
document.getElementById('addCash').addEventListener('click', addMoney);

function play() {
 var bet = parseInt(document.getElementById('bet').value, 10);
 if(bet <= balance && bet > 0)
 {
    var accepted = confirm("Do you really want to bet $" + bet.toLocaleString("en-US"));
    if(accepted)
    {
            var win = Math.round( Math.random() ); // Random win
            if(win)
            {
            	balance += bet;
            	alert("You won $" + bet.toLocaleString("en-US"));
            }
            else
            {
            	balance -= bet;
            	alert("You lost $" + bet.toLocaleString("en-US"));
            	alert("Your new balance is $" + balance.toLocaleString("en-US"));
            }

            if(balance === 0) { 
            	alert('You ran out of money...'); 

            }
            document.getElementById('account').textContent = (balance.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}));
        }
        document.getElementById('bet').value = 0;
    }
    else if(bet > balance) {
    	alert("Your bet is too high, you dont' have enough money.");

    }
    else if(bet < balance)
    {
    	alert("Your bet is too low, please bet $1.00 or more.");
    }
};

function addMoney () {
	var money = parseInt(document.getElementById('money').value, 10);
	if (money > 0)
	{
		var add = confirm("Do you really want to add $" + (money.toLocaleString("en-US")) + " to your account?");
		balance += money;
		alert("You added $" + money.toLocaleString("en-US") + " to your account.");
	}
	else
	{
		if(money <= 0) {
			alert("Please add an amount equal or grater than $1.00");
		}
	}
	document.getElementById("account").textContent = (balance.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}));
	document.getElementById('money').value = 0;
};

//Headroom JS
var myElement = document.querySelector(".headroom");
var headroom  = new Headroom(myElement, {
    "offset": 200,
    "classes": {
        "initial": "animated",
        "pinned": "slideDown",
        "unpinned": "slideUp"
    }
});
headroom.init();
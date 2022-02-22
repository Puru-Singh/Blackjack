var suits = ["Spades", "Hearts", "Diamonds", "Clubs"],
    values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    //cardWord = {'2':'Two of ', '3':'Three of ', '4':'Four of ', '5':'Five of ', '6':'Six of ', '7':'Seven of ', '8':'Eight of ', '9':'Nine of ', '10':'Ten of ', 'J':'Joker of ', 'Q':'Queen of ', 'K':'King of ', 'A':'Ace of '},
    cardWord = ['Two of ', 'Three of ', 'Four of ', 'Five of ','Six of ', 'Seven of ', 'Eight of ', 'Nine of ', 'Ten of ', 'Joker of ', 'Queen of ', 'King of ', 'Ace of '],
    deck = new Array(),
    balance = 100;

    textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button'),
    playerPanel = document.getElementById('playerScore'),
    dealerPanel = document.getElementById('dealerScore'),
    resultPanel = document.getElementById('result'),
    playerCardsPanel = document.getElementById('playerCards'),
    dealerCardsPanel = document.getElementById('dealerCards'),

    gameStarted = false,
    gameOver = false,
    playerCards = [],
    dealerCards = [],
    playerScore = 0,
    dealerScore = 0,
    playerWon = false,
    playerActive = true;

hitButton.style.display = 'none';
stayButton.style.display = 'none';
playerPanel.style.display = 'none';
dealerPanel.style.display = 'none';
resultPanel.style.display = 'none';
playerCardsPanel.style.display = 'none';
dealerCardsPanel.style.display = 'none';

function generateDeck()
{
    deck = new Array();
    var i,j,weight,card;
    for (i=0 ; i<values.length ; i++)
    {
        for(j=0 ; j<suits.length ; j++)
        {
            if(values[i] == "J" || values[i]=="Q" || values[i]=="K")
                weight = 10;
            else if(values[i] == "A")
                weight = 11;
            else
                weight = parseInt(values[i]);

            card = {Value: values[i], Suit: suits[j], Weight: weight, Name: cardWord[i]+suits[j]};
            deck.push(card);
        }
    }
}

function shuffle()
{
    // for 1000 turns
    // switch the values of two random cards
    for (var i = 0; i < 1000; i++)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function startBlackjack()
{
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    playerPanel.style.display = 'inline';
    resultPanel.style.display = 'none';
    dealerPanel.style.display = 'none';
    playerCardsPanel.style.display = 'inline';
    dealerCardsPanel.style.display = 'none';

    gameStarted = true;
    gameOver = false;
    playerWon = false;
    dealerWon = false;
    playerActive = true;
    text = '';

    generateDeck();
    shuffle();
    dealCards();
    updateUI();
}

function updateUI()
{
    if(gameOver == false)
    {
        playerPanel.innerHTML = 'Player Score = ' + playerScore + '\nNumber of cards = ' + playerCards.length;
        playerCardsPanel.innerHTML = '';
        for(var i=0 ; i<playerCards.length ; i++)
        {
            playerCardsPanel.innerHTML += playerCards[i].Name + '<br/>';
        }
    }
    else
    {
        playerPanel.innerHTML = 'Player Score = ' + playerScore + '\nNumber of cards = ' + playerCards.length;
        dealerPanel.style.display = 'inline';
        dealerCardsPanel.style.display = 'inline';
        dealerPanel.innerHTML = 'Dealer Score = ' + dealerScore + '\nNumber of cards = ' + dealerCards.length;

        playerCardsPanel.innerHTML = '';
        for(var i=0 ; i<playerCards.length ; i++)
        {
            playerCardsPanel.innerHTML += playerCards[i].Name + '<br/>';
        }
        dealerCardsPanel.innerHTML = '';
        for(var i=0 ; i<dealerCards.length ; i++)
        {
            dealerCardsPanel.innerHTML += dealerCards[i].Name + '<br/>';
        }
    }
}

function dealCards()
{
    playerScore = 0;
    dealerScore = 0;
    playerCards.length = 0;
    dealerCards.length = 0;
    for(var i=0 ; i<2 ; i++)
    {
        var card = deck.pop();
        playerScore += card.Weight;
        playerCards.push(card);
    }
    for(var i=0 ; i<2 ; i++)
    {
        card = deck.pop();
        dealerScore += card.Weight;
        dealerCards.push(card);
    }
    checkDefaultWin();
}

function checkDefaultWin()
{
    if(playerScore == 21 && dealerScore == 21)
    {
        gameOver = true;
        playerWon = dealerWon = false;
        text = 'Default: ';
        endBlackjack();
    }
    else if(playerScore == 21)
    {
        gameOver = true;
        playerWon = true;
        text = 'Default win: ';
        endBlackjack();
    }
    else if(dealerScore == 21)
    {
        gameOver = true;
        dealerWon = true;
        text = 'Default win: ';
        endBlackjack();
    }
}

function checkWin()
{
    if(playerScore > dealerScore)
    {
        playerWon = true;
        gameOver = true;
    }
    else if(dealerScore > playerScore)
    {
        dealerWon = true;
        gameOver = true;
    }
    else
    {
        gameOver = true;
        playerWon = dealerWon = false;
    }
}

function hitHTML()
{
    hit(true);
    updateUI();
}

function hit(flag)
{
    var card;
    card = deck.pop();
    if(flag == true)
    {
        playerScore += card.Weight;
        playerCards.push(card);
    }
    else
    {
        //while(dealerScore < 17)
        //{
            dealerScore += card.Weight;
            dealerCards.push(card);
        //}
    }
    checkBust();
}

function checkBust()
{
    if(playerScore > 21)
    {
        playerWon = false;
        dealerWon = true;
        gameOver = true;
        endBlackjack();
    }
    else if(dealerScore > 21)
    {
        playerWon = true;
        dealerWon = false;
        gameOver = true;
        endBlackjack();
    }
}

function stay()
{
    if(playerActive == true)
    {
        playerActive = false;
        //checkWin();
        //if(dealerWon == false)
        //{
            if(dealerScore < 17)
            {
                hit(false);
                /*
                if(gameOver == false)
                    checkWin();
                */
            }
        //}
        endBlackjack();
    }
}

function endBlackjack()
{
    if(gameOver == false)
    {
        checkWin();
    }
    updateUI();
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    text = '';
    if(playerWon)
    {
        text += 'Player Won.';
        balance += 20;
    }
    else if(dealerWon)
    {
        text += 'Dealer Won.';
        balance -= 20;
    }
    else
        text += 'Game Draw.';
    resultPanel.innerHTML = text + ' Balance = ' + balance;
    resultPanel.style.display = 'inline';
    newGameButton.style.display = 'inline';
}
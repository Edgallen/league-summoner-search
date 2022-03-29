/*=============== CHECK IF PAGE LOADED ===============*/ 
const body = document.getElementsByTagName('body');

// Rome 'transition - none' when page is loaded
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    body[0].classList.remove('preload');
  }
};

/*=============== SEARCH ===============*/ 
const inputField = document.querySelector('.search__textfield');
const searchButton = document.querySelector('.search__button');
const searchSection = document.querySelector('.search');
const apiKey = ''; //Insert your API Key

function renderSearchResult(name, iconId, level, tier, winrate) {
  const newElement = document.createElement('div');
  newElement.classList.add('search__result');
  newElement.innerHTML = `
    <img src="http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${iconId}.png" alt="" class="search__icon">

      <div class="search__info">
        <h3 class="search__info-title">${name}</h3>

        <div class="search__stats">
          <span class="search__stats-winrate">Винрейт: ${winrate}%</span>
          <span class="search__stats-devision">Ранг: ${tier}</span>
          <span class="search__stats-level">Уровень: ${level}</span>
        </div>
        
        <a href="" class="search__link">Узнать больше</a>

      </div>
  `;

  searchSection.appendChild(newElement);
};

function countWinrate(games, wins) {
  return (wins / games * 100).toFixed(2);
};

async function onSubmit(summonerName) {
  const player = {
    playerId: '',
    name: '',
    iconId: '',
    level: '',
    tier: '',
    winrate: ''
  }

  await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    player.playerId = data.id;
    player.name = data.name
    player.iconId = data.profileIconId;
    player.level = data.summonerLevel;

    return fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.playerId}?api_key=${apiKey}`)
  })
  .then(response => response.json())
  .then(summoner => {
    console.log(summoner);
    if (summoner[0].tier) {
      console.log('бомж')
    }
    player.tier = summoner[0].tier;
    player.winrate = countWinrate(summoner[0].wins + summoner[0].losses, summoner[0].wins)
  })
  .catch(err => {
    console.log('Error', err.message);
  })

  renderSearchResult(player.name, player.iconId, player.level, player.tier, player.winrate);
};

searchButton.addEventListener('click', () => {
  onSubmit(inputField.value)
});

function summa(arr) {
  var sum = 0;
  for(var i = 0; i < arr.length; i++) {
    sum += arr[i];

    console.log(sum);
  }
};

var array = [6,8,1];
summa(array);
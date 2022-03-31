// Переменные
const searchSection = document.querySelector('.search');
const apiKey = ''; // Insert API Key

// Рендер результата
function renderSearchResult(name, iconId, level, tier, winrate, unranked) {
  const rankArr = rankTranslate(tier, unranked);

  const newElement = document.createElement('div');
  newElement.classList.add('search__result');
  newElement.innerHTML = `
    <img src="http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${iconId}.png" alt="" class="search__icon">

      <div class="search__info">
        <h3 class="search__info-title">${name}</h3>

        <div class="search__stats">
          <span class="search__stats-winrate">Винрейт: <span class="${winrateColor(winrate)}" >${winrate} </span></span>
          <span class="search__stats-devision">Ранг: <span class="${rankArr[1]}" >${rankArr[0]}</span></span>
          <span class="search__stats-level">Уровень: ${level}</span>
        </div>
        
        <a href="" class="search__link">Узнать больше</a>

      </div>
  `;

  searchSection.appendChild(newElement);
};

function removeRenderResult() {
  const searchResult = document.querySelector('.search__result');

  if (searchResult == null) {
    return
  } else {
    searchResult.remove();
  }
}

// Определение цвета винрейта
function winrateColor(winrate) {

  winrate = parseFloat(winrate);

  if (winrate > 50) {
    return 'positive-winrate'
  } else if (winrate < 50) {
    return 'negative-winrate'
  } else {
    return
  }
}

// Перевод ранка
function rankTranslate(tier, unranked) {
  if (unranked) {
    return ['Анранкед']
  }

  const tierArr = [];

  switch (tier){
    case 'CHALLENGER': 
      tierArr.push('Челленджер');
      tierArr.push('CHALLENGER');
      break;
    case 'GRANDMASTER': 
      tierArr.push('Грандмастер');
      tierArr.push('GRANDMASTER');
      break;
    case 'MASTER': 
      tierArr.push('Мастер');
      tierArr.push('MASTER');
      break;
    case 'DIAMOND': 
      tierArr.push('Даймонд');
      tierArr.push('DIAMOND');
      break;
    case 'PLATINUM': 
      tierArr.push('Платина');
      tierArr.push('PLATINUM');
      break;
    case 'GOLD': 
      tierArr.push('Золото');
      tierArr.push('GOLD');
      break;
    case 'SILVER': 
      tierArr.push('Серебро');
      tierArr.push('SILVER');
      break;
    case 'BRONZE': 
      tierArr.push('Бронза');
      tierArr.push('BRONZE');
      break;
    case 'IRON': 
      tierArr.push('Бревно');
      tierArr.push('IRON');
      break;
  }
  
  return tierArr
}

// Расчет % винрейта
function countWinrate(games, wins, unranked) {
  if (unranked) {
    return 'Анранкед'
  } else {
    return `${(wins / games * 100).toFixed(2)} %`;
  }
};

// Get запрос
async function searchSummoner(summonerName) {
  const player = {
    playerId: '',
    name: '',
    iconId: '',
    level: '',
    tier: '',
    winrate: '',
    unranked: false
  }

  await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    if (data) {
      player.playerId = data.id;
      player.name = data.name;
      player.iconId = data.profileIconId;
      player.level = data.summonerLevel;
    }
    return fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.playerId}?api_key=${apiKey}`)
  })
  .then(response => response.json())
  .then(summoner => {

    if (summoner[0] == undefined) {
      player.unranked = true;
      player.winrate = countWinrate('', '', player.unranked);
    } else {
      player.tier = summoner[0].tier;
      player.winrate = countWinrate(summoner[0].wins + summoner[0].losses, summoner[0].wins, );
    }

  }).then(() => {
    removeRenderResult();
    renderSearchResult(player.name, player.iconId, player.level, player.tier, player.winrate, player.unranked);
  })
  .catch(err => {
    console.log('Error', err.message);
  })
};

export {searchSummoner};
/*=============== CHECK IF PAGE LOADED ===============*/ 
const body = document.getElementsByTagName('body');

// Rome 'transition - none' when page is loaded
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    body[0].classList.remove('preload');
  }
};

/*=============== SEARCH ===============*/ 
import {searchSummoner} from './summonerSearch.js';
const inputField = document.querySelector('.search__textfield');
const searchButton = document.querySelector('.search__button');

searchButton.addEventListener('click', () => {
  searchSummoner(inputField.value);
});

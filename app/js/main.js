$(function () {

  const selectTag = document.querySelectorAll('.app__select');
  const all__select = document.querySelectorAll('.app__select');
  const input = document.querySelector('.app__from'),
    inputTo = document.querySelector('.app__to'),
    btnFrom = document.querySelector('.app__btn-sound__from'),
    btnTo = document.querySelector('.app__btn-sound__to'),
    copyTo = document.querySelector('.app__copy-to'),
    copyFrom = document.querySelector('.app__copy-from');
  selectTag.forEach((tag, id) => {

    let option = ``;
    for (const country_cod in countries) {

      let selected = '';
      if (id == 0 && country_cod == `en-GB`) {
        selected = `selected`
      } else if (id == 1 && country_cod == `uk-UA`) {
        selected = `selected`
      }

      option += `<option class="app__option" value="${country_cod}" ${selected}>${countries[country_cod]}</option>`;
    }
    tag.innerHTML = option;

  });


  btnFrom.addEventListener('click', () => {
    utterance = new SpeechSynthesisUtterance(input.value);
    utterance.lang = selectTag[0].value;
    speechSynthesis.speak(utterance);
  });

  btnTo.addEventListener('click', () => {
    utterance = new SpeechSynthesisUtterance(inputTo.value);
    utterance.lang = selectTag[1].value;
    speechSynthesis.speak(utterance);
  });

  
  all__select.forEach(item => {
    item.addEventListener('input', getTranslateText)
  });


  copyTo.addEventListener('click',()=>{
    navigator.clipboard.writeText(inputTo.value);
    alert('Скопійовано!')
  });

  copyFrom.addEventListener('click', () => {
    navigator.clipboard.writeText(input.value);
    alert('Скопійовано!')
  });





  input.addEventListener('input', getTranslateText)

  function getTranslateText() {
    let translateFrom = selectTag[0].value,
      translateTo = selectTag[1].value,
      apiUrl = `https://api.mymemory.translated.net/get?q=${input.value}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(response => response.json()).then(data => {
      inputTo.value = ``;
      if (data.responseData.translatedText === "QUERY LENGTH LIMIT EXCEDEED. MAX ALLOWED QUERY : 500 CHARS"){
        alert(`Максимум 500 символів!`);
        input.value = '';
      }
       
      if (data.responseStatus === 200) {
        inputTo.value = data.responseData.translatedText;
      } else {
        inputTo.value = ``;
      }
      console.log(data);
      console.log(data.responseData.translatedText);
    });

  }

})
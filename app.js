document.addEventListener('DOMContentLoaded', function () {
  const places = [];
  const input = document.querySelector('#place');
  const suggestions = document.querySelector('.suggestions');

  fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
    .then(data => data.json())
    .then(data => places.push(...data));

  function findMatches() {
    const re = new RegExp(this.value, 'gi');
    const filteredList = places.filter(place => place.city.match(re) || place.state.match(re));
    const html = filteredList.map(place => {
      const city = place.city.replace(re, `<span class="hl">${this.value}</span>`);
      const state = place.state.replace(re, `<span class="hl">${this.value}</span>`);
      return `
      <li>
        ${city}, ${state}
      </li>  
      `
    }).join('');
    suggestions.innerHTML = html;
  }

  input.addEventListener('keyup', findMatches);
});
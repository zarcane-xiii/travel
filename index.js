
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('btnSearch');

let travelData = [];

fetch('travel.json')
  .then(response => response.json())
  .then(data => {
    travelData = data; // Store it globally because your brain can't store anything
    console.log(travelData);
  })
  .catch(error => {
    console.error('You screwed up fetching:', error);
  });

  searchButton.addEventListener('click', function() {
    const keyword = searchInput.value.toLowerCase();
    
    let results = [];
  
    if (keyword.includes('beach')) {
      results = travelData.beaches;
    } else if (keyword.includes('temple')) {
      results = travelData.temples;
    } else if (keyword.includes('country')) {
      // Flatten the cities inside countries into one big fat array
      results = travelData.countries.flatMap(country => country.cities);
    } else {
      console.log('No matching braincells... I mean keywords.');
    }
  
    displayResults(results);
  });
  
  function displayResults(places) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    if (places.length === 0) {
      resultsDiv.innerHTML = '<p>No matching results. Try harder.</p>';
      return;
    }
  
    places.forEach(place => {
      const name = place.name || "Unknown Place";
      const img = place.imageUrl || "default.jpg"; // fallback
      const desc = place.description || "No description available.";
  
      const placeDiv = document.createElement('div');
      placeDiv.classList.add('place-card'); // <-- ADD THIS CLASS
  
      placeDiv.innerHTML = `
        <img src="${img}" alt="${name}">
        <div class="place-card-content">
          <h3>${name}</h3>
          <p>${desc}</p>
        </div>
      `;
      resultsDiv.appendChild(placeDiv);
    });
  }
  
  const clearButton = document.getElementById('btnClear');

clearButton.addEventListener('click', function() {
  document.getElementById('results').innerHTML = '';
  searchInput.value = '';
});

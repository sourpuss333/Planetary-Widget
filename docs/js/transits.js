document.addEventListener('DOMContentLoaded', function() {
    const transitsTableBody = document.querySelector('#transits_table tbody');
    const currentDateTimeElement = document.getElementById('current_datetime');
    const signNames = {
        'Ari': 'Aries', 'Tau': 'Taurus', 'Gem': 'Gemini', 'Can': 'Cancer', 
        'Leo': 'Leo', 'Vir': 'Virgo', 'Lib': 'Libra', 'Sco': 'Scorpio', 
        'Sag': 'Sagittarius', 'Cap': 'Capricorn', 'Aqu': 'Aquarius', 'Pis': 'Pisces'
    };

    function formatPosition(position) {
        const degrees = Math.floor(position);
        const minutes = Math.round((position - degrees) * 60);
        return `${degrees}˚ ${minutes < 10 ? '0' : ''}${minutes}'`;
    }

    function fetchTransits() {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                if (this.status >= 200 && this.status < 300) {
                    const response = JSON.parse(this.responseText);
                    console.log('Full API Response:', response); // Log full API response
                    
                    transitsTableBody.innerHTML = ''; // Clear previous data

                    const data = response.data;
                    console.log('API Data:', data); // Log data object

                    const planets = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "true_node", "chiron"];
                    
                    planets.forEach(planet => {
                        if (data[planet]) {
                            const transit = data[planet];
                            const row = document.createElement('tr');
                            const planetCell = document.createElement('td');
                            const signCell = document.createElement('td');
                            const positionCell = document.createElement('td');
                            const qualityCell = document.createElement('td');
                            const elementCell = document.createElement('td');

                            planetCell.textContent = planet === 'true_node' ? 'True Node' : transit.name;
                            signCell.textContent = signNames[transit.sign] || transit.sign;
                            positionCell.textContent = formatPosition(transit.position);
                            qualityCell.textContent = transit.quality;
                            elementCell.textContent = transit.element;

                            row.appendChild(planetCell);
                            row.appendChild(signCell);
                            row.appendChild(positionCell);
                            row.appendChild(qualityCell);
                            row.appendChild(elementCell);
                            transitsTableBody.appendChild(row);
                        }
                    });

                    // Set current date and time
                    const currentDateTime = new Date();
                    currentDateTimeElement.textContent = `Providence, RI, ${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                } else {
                    console.error('API Error:', this.status, this.statusText);
                }
            }
        });

        xhr.open('GET', 'https://astrologer.p.rapidapi.com/api/v4/now');
        xhr.setRequestHeader('X-RapidAPI-Key', 'd178557117mshb1a4db8f3ea6536p1dc80ajsn171a488a949d');
        xhr.setRequestHeader('X-RapidAPI-Host', 'astrologer.p.rapidapi.com');

        xhr.send(null);
    }

    fetchTransits(); // Fetch transits for Providence, RI
});

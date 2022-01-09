const imagesFolder = './assets/img/';
const weatherData = [
    {
        day: "Today",
        pronostic: "some rain",
        image: "some_rain.png",
        degrees: {
            max: 24,
            min: 18
        }
    },
    {
        day: "Tomorrow",
        pronostic: "some sun",
        image: "some_sun.png",
        degrees: {
            max: 27,
            min: 19
        }
    },
    {
        day: "Friday",
        pronostic: "some clouds",
        image: "some_clouds.png",
        degrees: {
            max: 21,
            min: 16
        }
    },
    {
        day: "Saturday",
        pronostic: "some sun",
        image: "some_sun.png",
        degrees: {
            max: 26,
            min: 21
        }
    }
];

const weatherLinks = document.querySelectorAll('.weather-link');
const weatherContainer = document.querySelector('#weatherContainer');
const temperatureSelect = document.querySelector('#temperatureSelect');

const notificationContainer = document.querySelector('#notificationContainer');
const acceptButton = document.querySelector('#acceptBtn');

acceptButton.addEventListener('click', () => {
    notificationContainer.classList.add('hide');
});

const celsiusToFahrenheit = (celsius) => Math.round((celsius * 1.8) + 32);
const fahrenheitToCelsius = (fahrenheit) => Math.round((fahrenheit - 32) * 0.55);

for (const link of weatherLinks) {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Loading weather report...');
    });
}

temperatureSelect.addEventListener('change', (e) => {
    if(e.target.value === 'celsius') {
        weatherData.map(item => {
            item.degrees.max = fahrenheitToCelsius(item.degrees.max);
            item.degrees.min = fahrenheitToCelsius(item.degrees.min);
        });
    } else if (e.target.value === 'fahrenheit') {
        weatherData.map(item => {
            item.degrees.max = celsiusToFahrenheit(item.degrees.max);
            item.degrees.min = celsiusToFahrenheit(item.degrees.min);
        });
    }

    generatePronosticItems();
});

function generatePronosticItems() {
    // Limpiar contenedor
    weatherContainer.innerHTML = '';

    weatherData.map(item => {
        const column = document.createElement('div');
        column.className = 'col weather-2-col';

        const card = document.createElement('div');
        card.className = 'card bg-gray text-center';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';

        const cardHeaderTitle = document.createElement('h3');
        cardHeaderTitle.innerText = item.day;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardBodyRow = document.createElement('div');
        cardBodyRow.className = 'row f-list f-center';

        const weatherImage = document.createElement('img');
        weatherImage.className = 'img-icon-circle';
        weatherImage.alt = item.pronostic;
        weatherImage.src = `${imagesFolder}${item.image}`;

        const weatherTitle = document.createElement('p');
        weatherTitle.className = 'fw-bold';
        weatherTitle.innerText = item.pronostic;

        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer';
        
        const cardFooterRow = document.createElement('div');
        cardFooterRow.className = 'row f-x-evenly';

        const maxDegree = document.createElement('p');
        maxDegree.className = 'text-danger fw-bold text-lg max-degree';
        maxDegree.innerText = `${item.degrees.max}º`;

        const minDegree = document.createElement('p');
        minDegree.className = 'text-primary fw-bold text-lg min-degree';
        minDegree.innerText = `${item.degrees.min}º`;
        
        // Jerarquía de elementos
        cardHeader.appendChild(cardHeaderTitle);
        cardBodyRow.append(weatherImage, weatherTitle);
        cardBody.append(cardBodyRow);
        cardFooterRow.append(maxDegree, minDegree);
        cardFooter.appendChild(cardFooterRow);
        card.append(cardHeader, cardBody, cardFooter);
        column.appendChild(card);

        // Pintar en el DOM
        weatherContainer.appendChild(column);
    });
}

// Función anónima autoejecutable
(function() {
    generatePronosticItems();
})();
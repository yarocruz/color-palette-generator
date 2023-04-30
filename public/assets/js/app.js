const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const query = form.elements.query.value;
    fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query})
    }).then(res => res.json())
        .then(data => {
            const container = document.querySelector('.container');
            container.innerHTML = '';
            createPalette(data.colors, container);
            setColors(data.colors);
            form.elements.query.value = '';
        });
});

// create function to set the colors to local storage
function setColors(colors) {
    localStorage.setItem("colors", JSON.stringify(colors));
}

// create function to get the colors from local storage
function getColors() {
    const colors = JSON.parse(localStorage.getItem("colors"));
    if (colors) {
        const container = document.querySelector('.container');
        container.innerHTML = '';
        createPalette(colors, container);
    } else {
        const container = document.querySelector('.container');
        container.innerHTML = '';
        createPalette(['#000000', '#ffffff'], container);
    }
}

function createPalette(colors, container) {
    for (const color of colors) {
        const div = document.createElement('div');
        div.classList.add('color');
        div.style.backgroundColor = color;
        if (screen.width < 768) {
            div.style.width = "100%";
        } else {
            div.style.width = `calc(100% / ${colors.length})`;
        }

        div.addEventListener('click', function () {
            navigator.clipboard.writeText(color);
        });

        const span = document.createElement('span');
        span.innerText = color;
        div.appendChild(span);
        container.appendChild(div);
    }
}

getColors();
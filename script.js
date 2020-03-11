let cityInput = document.querySelector("#cityInput");
let submit = document.querySelector("#submit");
let target = document.querySelector("#target");
let address = document.querySelector("#address");
let myData = {};
let favStores = {};
let favContainer = document.querySelector("#favContainer")

window.addEventListener('DOMContentLoaded', () => {
    loadStores();
    populateFavs();
});

submit.addEventListener("click", () => {
    fetch(`https://bolaget.io/stores?city=${cityInput.value}&limit=100`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            //Removes item
            /*   target.innerHTML = ""; */
            //Empties city list
            address.innerHTML = "";
            //Adds placeholder option
            addPlaceholder();
            data.forEach(store => {
                createAndAppendContent(store);
            })
            myData = data;
            console.log(myData);
        });
})

address.addEventListener("change", e => {
    myData.forEach(store => {
        if (e.target.value == store.address) {
            createStoreCard(store);
        }
    })
})
createAndAppendContent = (store) => {
    let option = document.createElement("option");
    option.textContent = store.address;
    option.value = store.address;
    option.id = store.address;
    address.appendChild(option);
}
addPlaceholder = () => {
    address.innerHTML = '<option value="">Välj butik</option>'
}

saveStore = (store) => {
    favStores[`${store.address}`] = {
        address: store.address,
        city: store.city
    };
    localStorage.setItem("favStores", JSON.stringify(favStores));
}

loadStores = () => {
    favStores = JSON.parse(localStorage.getItem("favStores"));
    if (favStores == null) {
        favStores = {};
    }
    return favStores;
}

populateFavs = () => {
    favContainer.innerHTML = "";
    Object.values(favStores).forEach(store => {
        let storeLi = document.createElement("li");
        let storeAddress = document.createElement("p");
        let storeCity = document.createElement("p");
        let deleteButton = document.createElement("button");

        storeAddress.textContent = store.address;
        storeCity.textContent = store.city;
        /*  deleteButton.innerHTML = `<i id="${store.address}" class="far fa-trash-alt"></i>` */
        deleteButton.textContent = "ta bort"
        deleteButton.className = "deleteButton"
        deleteButton.id = `${store.address}`

        storeLi.addEventListener("click", (e) => {
            if (e.target.className != "deleteButton") {
                fetch(`https://bolaget.io/stores?city=${store.city}&limit=100`)
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
                        data.forEach(fetchedStore => {
                            if (store.address == fetchedStore.address) {
                                createStoreCard(fetchedStore);
                            }
                        })
                    });
            }
        })

        deleteButton.addEventListener("click", (e) => {
            console.log("deleted " + e.target.id);
            console.log(favStores)
            delete favStores[`${e.target.id}`];
            console.log(favStores)
            localStorage.setItem("favStores", JSON.stringify(favStores));
            populateFavs();
        })

        storeLi.appendChild(storeAddress);
        storeLi.appendChild(storeCity);
        storeLi.appendChild(deleteButton);
        favContainer.appendChild(storeLi);
    })
}

createStoreCard = (store) => {
    //Removes item
    target.innerHTML = "";
    let storeLi = document.createElement("li");
    let storeDiv = document.createElement("div");
    let storeAddress = document.createElement("h3");
    let storeName = document.createElement("p");
    let status = document.createElement("h3");
    let openingHours = document.createElement("p");
    let favButton = document.createElement("button");
    let closeButton = document.createElement("button");

    storeLi.className = "storeLi";
    storeDiv.className = "storeDiv";
    storeAddress.textContent = store.address;
    storeName.textContent = store.name;
    status.textContent = "Öppetider ej tillgängliga"
    status.style.color = "red"
    openingHours.textContent = store.opening_hours[0];
    /*     favButton.innerHTML = '<i class="fas fa-heart"></i>' */
    favButton.textContent = "favoritmarkera"
    favButton.className = "favButton"
    /*  closeButton.innerHTML = '<i class="fas fa-times"></i>' */
    closeButton.textContent = "stäng"
    closeButton.className = "closeButton"

    if (store.opening_hours[1]) {
        let opening = Number(store.opening_hours[0].slice(11, 13));
        let closing = Number(store.opening_hours[0].slice(17, 19));

        let time = new Date();
        let timeHour = time.getHours();
        if (timeHour >= opening && timeHour < closing) {
            status.innerHTML = 'Öppet! <i class="fa fa-glass-cheers"></i>'
            status.style.color = "green"
            status.style.fontSize = "36px"
        } else {
            status.textContent = "Stängt"
            status.style.fontSize = "36px"
        }
    }

    closeButton.addEventListener("click", () => {
        target.innerHTML = "";
    })

    favButton.addEventListener("click", () => {
        saveStore(store);
        populateFavs();
    })

    storeDiv.appendChild(storeAddress);
    storeDiv.appendChild(storeName);
    storeDiv.appendChild(status);
    storeDiv.appendChild(openingHours);
    storeDiv.appendChild(favButton);
    storeDiv.appendChild(closeButton);
    storeLi.appendChild(storeDiv);
    target.appendChild(storeLi);
}


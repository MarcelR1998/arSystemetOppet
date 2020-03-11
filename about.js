let textTarget = document.querySelector("#textTarget");
let about = document.querySelector("#about");
let api = document.querySelector("#api");
about.style.backgroundColor = "#fed401";

document.body.addEventListener("click", e => {
    if (e.target == about) {
        api.style.backgroundColor = "white";
        about.style.backgroundColor = "#fed401";
        textTarget.innerHTML = "";
        textTarget.innerHTML = `<p>Ett litet projekt för att öva på att hantera API:er. 
        Denna sida företräder inte och är inte på något sätt relaterad till Systembolaget Aktiebolag, 
        och inte heller något annat företag eller myndighet.
        <br/>
        <br/>
        Skapat av Marcel Rossi
        <br/>
        <a href="https://github.com/MarcelR1998">github.com/MarcelR1998</p>`;
    }
    if (e.target == api) {
        about.style.backgroundColor = "white";
        api.style.backgroundColor = "#fed401";
        textTarget.innerHTML = "";
        textTarget.innerHTML = `<p>API:t jag använt mig av heter bolaget.io, och är en konvertering till JSON
         baserat på systembolagets officiella API.</p>
         
         <a href="https://bolaget.io/">bolaget.io</a>
         <br/>
         <a href="https://www.systembolaget.se/api">systembolaget.se/api/</a>
         `;
    }
})
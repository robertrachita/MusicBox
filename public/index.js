let wrapper = document.getElementById("contentIndex");

const imgPath = "img/indexIcons/";
const imgNames = ["chats.svg", "chats.svg", "chats.svg", "chats.svg", "chats.svg", "chats.svg", "chats.svg"];
// const titles = ["Profile", "Music Sheets", "Update Profile", "Messages", "Groups", "Upload","Settings"];
// const targetLocations = ["/profile", "", "", "", "",""];
const titles = ["Profile", "Music Sheets", "Call", "Upload Sheets", "View Uploaded Sheets", "Settings"];
const targetLocations = ["/profile", "/musicsheets", "https://musicdate-room.herokuapp.com/", "/upload", "/view_uploads", "/settings"];
const tilesPerRow = 4;
const rows = Math.ceil(imgNames.length / tilesPerRow);
console.log(rows);

for (let i = 0; i < rows; i++) {
    let element = "<div class='tileRow'></div>";
    let template = Handlebars.compile(element);
    let data = template();
    console.log(data);
    wrapper.innerHTML += data;
}

for (let i = 0; i < titles.length; i++) {
    let row = document.getElementsByClassName('tileRow')[Math.floor(i / tilesPerRow)];
    let element;
    if (titles[i] != "Call") {
        element =
            `<a href="{{targetLocation}}" class="tileLinks">
            <div class="tile">
                <img class="icons" src="{{imgLocation}}">
                <p class="tileTitles">{{title}}</p>
            </div>
        </a>`;
    } else {
        element = `<a href="{{targetLocation}}" target = "_blank" rel = "noopener noreferrer" class="tileLinks">
    <div class="tile">
        <img class="icons" src="{{imgLocation}}">
        <p class="tileTitles">{{title}}</p>
    </div>
    </a>`;
    }

    let template = Handlebars.compile(element);
    let data = template({ imgLocation: imgPath + imgNames[i], title: titles[i], targetLocation: targetLocations[i] });
    row.innerHTML += data;
}
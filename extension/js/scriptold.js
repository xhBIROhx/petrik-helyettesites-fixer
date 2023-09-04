console.log("Getting table info");
const table = document.querySelectorAll('.hianyzas')
date = document.getElementsByClassName("datum")[0].textContent
//console.log(table)


console.log("Resetting page");
document.body.innerHTML = '' //delete page
{head = document.querySelector("head") //remove css
head.removeChild(document.head.getElementsByTagName("link")[0])}

console.log("adding more css")
add_css()

console.log("Repopulating page");
{main = document.createElement("div");
main.id = 'main'
document.body.appendChild(main)}

//header
header = document.createElement("header")
logo_href = document.createElement("a")
logo_href.href = "https://petrik.hu/"
logo = document.createElement("img")
logo.src = "icon.png"
logo_href.appendChild(logo)
header.appendChild(logo_href)

day = document.createElement("div")
day.classList.add('datum')
day.appendChild(document.createTextNode(date))
header.appendChild(day)

//search
var searchBox = document.createElement('div');
searchBox.classList.add('search-box');

var label = document.createElement('label');
label.setAttribute('for', 'search-input');
//label.textContent = 'Keresés: ';
searchBox.appendChild(label);

var input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('id', 'search-input');
input.setAttribute('placeholder', 'Keresés..');
searchBox.appendChild(input);

search_div = document.createElement('div')
search_div.appendChild(searchBox)
search_div.id = "search"
header.appendChild(search_div)

document.body.insertBefore(header, document.getElementById("main"))


for (var i = 0; i < table.length; i++) {
    const header = table[i].querySelectorAll(".tanarcim")
    entries = table[i].querySelectorAll(".data")
    //console.log("main "+i)

    /*console.log("header:")
    console.log(header)
    console.log("entries:")
    console.log(entries) */

    if (entries.length == 0) {
        //console.log("this only has informational text")
        add_informational_text(header[0].textContent, document.getElementById("main"))
    }else {
        //console.log("this has " + entries.length + " number of data entries")
        rows = []
        for (var j = 0; j < entries.length; j++) {
            //console.log("subs "+ j)
            subentries = entries[j].querySelectorAll("div")
            //onsole.log(subentries)
            rows.push(subentries)
        }
        try{
            add_table_with_header(header[0].textContent, rows, document.getElementById("main"))
        }catch{
            console.log("something happended what shouldn't have ¯\\_(ツ)_/¯")
        }
    }
}

console.log("Reformatted!")

function add_informational_text(text,parent) {
    newDiv = document.createElement("div");
    newDiv.classList.add('information');
    newDiv.classList.add('entry');
    newContent = document.createTextNode(text);
    newDiv.appendChild(newContent);
    parent.appendChild(newDiv)
}

function add_table_with_header(header, rows, parent) {

    //teacher
    newDiv = document.createElement("div");
    newDiv.classList.add('entry');
    strong_tag = document.createElement("strong")
    content = document.createTextNode(header);
    strong_tag.appendChild(content)
    newDiv.appendChild(strong_tag);

    //rows
    table_div = document.createElement("table")

    //legend
    {legends = ["óra", "tanár", "terem", "osztály", "jegyzetek"]
    row = document.createElement("tr")
    legends.forEach((legend) => {
        header_legend = document.createElement("th")
        content = document.createTextNode(legend)
        header_legend.appendChild(content)
        row.appendChild(header_legend)
    })
    table_div.appendChild(row)}

    //contents
    for (var i = 0; i < rows.length; i++) {
        //console.log("insterting row "+i)
        row = document.createElement("tr")        

        for (var j = 0; j < rows[i].length; j++) {
            //console.log(rows[i][j])
            table_data = document.createElement("td")
            string_data = document.createTextNode(rows[i][j].textContent)
            table_data.appendChild(string_data)
            row.appendChild(table_data)
        }
        if(rows[i].length == 4) {
            empty_data = document.createElement("td")
            row.appendChild(empty_data)
        }

        table_div.appendChild(row)
    }
    newDiv.appendChild(table_div)
    parent.appendChild(newDiv)
}

function add_css(){
    styles =
    `
    body {
        font-family: OpenSans;
        background-color: #141414;
        color: white;
    }
    header{
        display: flex;
        width:100%;
        height: 60px;
        margin-bottom:20px;
        background:linear-gradient(90deg, #def6e900 0%,#72c3b6 100% );
    }
    header a img{
        height:60px;
        width:60px;
        cursor: pointer;
        position: fixed;
    }

    #search {
        margin: auto 7% auto auto;
    }
    #search input, #search input:focus, #search input:active {
        outline: none;
        border-color: transparent;
        border-bottom: 2px solid #313131;
        background: transparent;
        color: #212121;
        font-style: italic;
        font-size: 15px
    }

    .entry {
        height:fit-content;
        margin:40px auto 40px auto;
        margin-left: 25%;
        margin-right: 25%;
        border-top:10px solid #72c3b6;
        background:#ffffff20;
        box-shadow: 0 0 10px 2px #000;
    }

    .datum{
        font-size:32px;
        padding:10px;
        padding-left: 10%;
    }

    .information, .entry strong{
        font-size:28px;
        text-align: center;
    }
    .entry strong {
        padding-left: 7%;
    }

    table {
        table-layout: fixed;
        width: 100%;
        margin-top: 20px;
    }
    table, th, td {
        border-collapse: collapse;
        border-bottom: 1px solid gray;
        text-align: center;
        font-size: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    #main {
        max-width: 100%;
    }
    #main div {
        padding-left: 5%;
        padding-right: 5%;
        padding-bottom: 2%;
        padding-top: 2%;
    }

    @media only screen and (max-width: 1900px) {
        .entry {
            margin-left: 20%;
            margin-right: 20%;
        }
    }
    @media only screen and (max-width: 1500px) {
        .entry {
            margin-left: 15%;
            margin-right: 15%;
        }
    }
    @media only screen and (max-width: 870px) {
        .entry {
            margin-left: 0;
            margin-right: 0;
        }
    }

    `
    styles = styles.replace(/(\r\n|\n|\r)/gm, "");
    styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

window.addEventListener('scroll', function() {
  if (window.scrollY >= 64) {
    document.querySelector('header a img').style.transition = 'filter 0.5s ease';
    document.querySelector('header a img').style.filter = 'brightness(50%)';
  } else {
    document.querySelector('header a img').style.transition = 'filter 0.5s ease';
    document.querySelector('header a img').style.filter = 'none';
  }
});

document.querySelector("input").addEventListener("input", search_update);

function search_update(e) {
    const value = e.target.value.trim();
    //console.log(value)
    document.querySelectorAll(".entry").forEach((entry) => {
        if(entry.classList.contains("information")) {
            //console.log(entry.textContent)
            if(entry.textContent.includes(value)){
                //show
                entry.style.removeProperty("display")
            }else{
                //hide
                entry.style.display = "none";
            }
        }else{
            table_rows=entry.querySelectorAll("tr")

            //check title
            entry_title = entry.querySelector("strong")
            if(entry_title.innerText.includes(value)){
                entry.style.removeProperty("display")
                table_rows.forEach((row) => {
                    //show all subrows
                    row.style.removeProperty("display")
                })
                return
            }

            var found_in_entry = false;
            table_rows.forEach((row) => {
                var found_in_row = false;
                //console.log(row)
                contents = row.querySelectorAll("td")
                contents.forEach((datapoint) => {
                    if(datapoint.textContent.includes(value)){
                        found_in_row = true
                        return;
                        //show
                    }
                })
                if (found_in_row){
                    found_in_entry = true
                    row.style.removeProperty("display")
                }else {
                    row.style.display = "none";
                }

            })


            if (found_in_entry){
                entry.style.removeProperty("display")
            }else {
                entry.style.display = "none";
            }
        }
    })
}

/* 
ora subdata => óra
helytan subdata => tanár
helytan subdata == "-" => nincs tanár, vaszeg mert elmarad
terem subdata => terem
terem subdata == "Elmarad" => lehet elmarad is 
osztaly subdata => osztály
subdata => plusz comment (optional)
*/
/* 
    [
        {
            date: ,
            information: [],
            teachers:
            [
                {
                    teacher: ,
                    rows: 
                        [
                            []
                        ]
                }
            ],
            classrooms:
            [
                []
            ]
        }
    ]
*/
const website_json = []
const legends = ["Óra", "Tanár", "Terem", "Osztály", "Jegyzetek"]

//get all the data
get_data()
console.log("Kell az egész helyettesítés egy json-ben?") //to-do SORT THE tachers[*].rows[*] with the .rows[0]'s order IF This is very easy to do make it doable by clicking the legend later
console.log(website_json) //to-do SORT THE tachers[*].rows[*] with the .rows[0]'s order IF This is very easy to do make it doable by clicking the legend later

//remove the website
rm_website()

//add new css
add_css()

//add new website contents
add_header()
dropdown = document.querySelector("select")
add_main()
main = document.querySelector("#main");
fill_dropdown()
previous_dropdown_value = dropdown.value
setup_listener_for_dropdown()
setup_listener_for_search()
setup_listener_for_scroll()
fill_main_space() //load_website_with_topmost_day


function get_data(){
    const website = document.querySelectorAll(".content div")
    var date_index = -1;
    var teremcsere_index = false

    website.forEach(element => {
        if (element.className.includes("subdata") || element.className.includes("tanarcim") || element.className.includes("data")){
            return;
        }
        //for every meaningfull element
        if(element.className.includes("datum")){
            date_index += 1
            if(!website_json[date_index]) {
                website_json[date_index] = {}
            }
            website_json[date_index].date = element.textContent
            teremcsere_index = false
        }
        if(element.className.includes("teremcserekcim")){
            teremcsere_index = true
        }
        if(element.className.includes("hianyzas")){
            if(teremcsere_index){

                if (!website_json[date_index].classrooms){
                    website_json[date_index].classrooms = []
                }
                //terem cserék
                row = []
                element.querySelectorAll(".subdata").forEach(sub_div => {
                    row.push(sub_div.textContent)
                })
                website_json[date_index].classrooms.push(row)

            }else{
                data = element.querySelectorAll(".data");
                if(data.length == 0){

                    //information
                    if (!website_json[date_index].information) {
                        website_json[date_index].information = []
                    }
                    website_json[date_index].information.push(element.querySelector(".tanarcim").textContent)

                }else {
                    //teacher shenanigans

                    if (!website_json[date_index].teachers) {
                        website_json[date_index].teachers = []
                    }
                    var rows = []
                    data.forEach(data_element => {
                        entries = data_element.querySelectorAll("div");

                        var row = []
                        entries.forEach(data_point => {
                            row.push(data_point.textContent)
                        })
                        if (row.length < 5 ){
                            row.push("")
                        }

                        rows.push(row)
                    });

                    website_json[date_index].teachers.push({teacher: element.querySelector(".tanarcim").textContent, rows: rows})
                }
            }
        }
    });
}

function rm_website(){
    document.body.innerHTML = '' //delete page
    document.head.removeChild(document.head.querySelector("link")) //remove css
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

    select, #title {
        font-family: OpenSans;
        outline: none;
        border: none;
        background: transparent;
        font-size: 32px;
        color: white;
        margin-left: 10%;
        margin-top: auto;
        margin-bottom: auto;
    }

    select option {
        background-color: black;
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
    styles = styles.replace(/(\r\n|\n|\r)/gm, "").replace(/ +/g, ' ');
    styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

function add_main() {
    main = document.createElement("div");
    main.id = 'main'
    document.body.appendChild(main)
}

function add_header() {
    header = document.createElement("header")

    //logo
    logo_href = document.createElement("a")
    logo_href.href = "https://petrik.hu/"
    logo = document.createElement("img")
    logo.src = "icon.png"
    logo_href.appendChild(logo)
    header.appendChild(logo_href)

    /* day = document.createElement("div")
    day.classList.add('datum')
    day.appendChild(document.createTextNode(date))
    header.appendChild(day) */

    //date
    const dropdown = document.createElement("select")
    header.appendChild(dropdown)

    //search
    search_div = document.createElement('div')
    search_div.id = "search"
    /* label = document.createElement('label'); //incase we'd need a label
    label.setAttribute('for', 'search-input');
    label.textContent = 'Keresés: ';
    searchBox.appendChild(label); */

    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'search-input');
    input.setAttribute('placeholder', 'Keresés..');
    search_div.appendChild(input);

    header.appendChild(search_div)

    document.body.appendChild(header)
}

function fill_dropdown() {
    var i = 0;
    //const dropdown = document.querySelector("select");
    website_json.forEach((day) => {
        option = document.createElement("option");
        option.setAttribute('value', i); i += 1;
        option.innerText = day.date;
        dropdown.appendChild(option)
    });
}

function setup_listener_for_search() {
    document.querySelector("input").addEventListener("input", filter_website);
}

function setup_listener_for_scroll() {
    petrik_logo = document.querySelector('header a img')
    window.addEventListener('scroll', function() {
        if (window.scrollY >= 64) {
            petrik_logo.style.transition = 'filter 0.5s ease';
            petrik_logo.style.filter = 'brightness(50%)';
        } else {
            petrik_logo.style.transition = 'filter 0.5s ease';
            petrik_logo.style.filter = 'none';
        }
    });
}

function setup_listener_for_dropdown() {
    dropdown.addEventListener("click", () => {
        if (dropdown.value != previous_dropdown_value) {
            previous_dropdown_value = dropdown.value

            fill_main_space()
            //filter website if the search is not empty
            if (document.querySelector("#search-input").value.trim()) {
                filter_website()
            }
        }else {
            //console.log("it's the same so we won't requery")
        }
    })
}

function fill_main_space(){
    //clear main space
    clear_main()

    //check if the website is empty or not (usually at the weekends)
    if (!website_json[dropdown.value]){
            new_div = document.createElement("div");
            new_div.classList.add('information');
            new_div.classList.add('entry');
            new_div.appendChild(document.createTextNode("Nincs információ a következő napokról"));
            main.appendChild(new_div);

            //remove search and date
            document.querySelector("#search").style.display = "none"
            dropdown.style.display = "none"

            //add some text maybe?
            new_div = document.createElement("div")
            new_div.innerText = "Petrik Lajos Két Tanítási Nyelvű Technikum"
            new_div.id = "title"
            document.querySelector("header").appendChild(new_div)
        return
    }

    //add shit
    if (website_json[dropdown.value].information){
        website_json[dropdown.value].information.forEach((text) => {
            //uhm print information
            //console.log(text)

            new_div = document.createElement("div");
            new_div.classList.add('information');
            new_div.classList.add('entry');
            new_div.appendChild(document.createTextNode(text));
            main.appendChild(new_div);

        })
    }
    if (website_json[dropdown.value].teachers) {
        website_json[dropdown.value].teachers.forEach((teacher_block) => {
            //uhmmm print harder information
            //console.log(teacher_block)
            //START
            new_div = document.createElement("div");

            //title
            new_div.classList.add('entry');
            strong_tag = document.createElement("strong");
            strong_tag.appendChild(document.createTextNode(teacher_block.teacher));
            new_div.appendChild(strong_tag);

            //table
            table_div = document.createElement("table")

            //table header
            row = document.createElement("tr")
            legends.forEach((legend) => {
                header_legend = document.createElement("th")
                header_legend.appendChild(document.createTextNode(legend))
                row.appendChild(header_legend)
            })
            table_div.appendChild(row)

            //other rows
            teacher_block.rows.forEach(row_data => {
                //console.log("insterting row "+i)
                row = document.createElement("tr")        

                row_data.forEach(data => {
                    //console.log(rows[i][j])
                    table_data = document.createElement("td")
                    string_data = document.createTextNode(data)
                    table_data.appendChild(string_data)
                    row.appendChild(table_data)
                })

                table_div.appendChild(row)
            })
            new_div.appendChild(table_div)
            main.appendChild(new_div)
            //END
        })
    }
    if (website_json[dropdown.value].classrooms) {
        new_div = document.createElement("div")
        new_div.classList.add('entry');

        //table
        table_div = document.createElement("table")

        //table header
        row = document.createElement("tr");
        (["Eredeti", "Áthelyezett", "Óra", "Osztály"]).forEach((data) => {
            table_data = document.createElement("th");
            table_data.appendChild(document.createTextNode(data));
            row.appendChild(table_data)
        })
        table_div.appendChild(row)

        //other rows
        website_json[dropdown.value].classrooms.forEach((classroom) => {
            //uhmmm print it all as one array (how)
            //console.log(classroom)
            row = document.createElement("tr")
            
            classroom.forEach((data) => {
                table_data = document.createElement("td")
                table_data.appendChild(document.createTextNode(data))
                row.appendChild(table_data)
            })

            table_div.appendChild(row)
        })
        new_div.appendChild(table_div)
        main.appendChild(new_div)
    }
}

function filter_website(){
    const value = document.querySelector("#search-input").value.trim().toLowerCase()
    //console.log("search: "+value)
    //search
    //console.log(value)
    it_was_empty = false
    if (!value){
        document.querySelectorAll(".entry").forEach((entry) => {
            entry.style.removeProperty("display")
        })
        document.querySelectorAll("tr").forEach(row => {
            row.style.removeProperty("display")
        })
        it_was_empty = true
    }
    if (it_was_empty){return}

    document.querySelectorAll(".entry").forEach((entry) => {
        if(entry.classList.contains("information")) {
            //console.log(entry.textContent)
            if(entry.textContent.toLowerCase().includes(value)){
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
            if(entry_title && entry_title.innerText.toLowerCase().includes(value)){
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

                //check if it's a TH, if yes, ignore
                if (row.querySelector("th")){return}

                contents = row.querySelectorAll("td")
                contents.forEach((datapoint) => {
                    if(datapoint.textContent.toLowerCase().includes(value)){
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

function clear_main() {
    main.innerHTML = ''
}
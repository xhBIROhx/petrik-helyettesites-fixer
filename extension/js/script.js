/* 
    [
        {
            date: ,
            information: ,
            teachers: ,
            classrooms: 
        },
        {
            --||--
        }
    ]
*/
const website_json = []

//get all the data
get_data()
console.log(website_json)

//remove the website

//add new css

//add new website contents




function get_data() {
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
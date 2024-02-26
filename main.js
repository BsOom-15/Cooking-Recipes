// call of the elements:
let btnAddRecipes = document.getElementById("btn-add-recipes");
let addForm = document.getElementById("form");
let add = document.getElementById("add");
let searchValue = document.getElementById("searching")
//call names of object:
let namerecipes = document.getElementById("namerecipes");
let serves = document.getElementById("serves");
let time = document.getElementById("time");
let discripe = document.getElementById("discripe");
let mood = "create";
let glopal;

// create a function to show the recipe add box:
function showForm(){
    addForm.style.display = "block";
}

// create array:
let container;

if(localStorage.getItem("recipes")==null){
    container = [];
}else{
    container = JSON.parse(localStorage.getItem("recipes"))
}
console.log(container);
displayRecipes()


// create object:

function addObject(){
    let recipe = {
        namerecipes:namerecipes.value,
        serves:serves.value,
        time:time.value,
        discripe:discripe.value,
    }
    if(mood === "create"){
        container.push(recipe);
    }else{
        container[glopal] = recipe;
        add.innerHTML = "ADD"
    }
    localStorage.setItem("recipes",JSON.stringify(container));
    // console.log(container);
    displayRecipes()
    clearData()
}


function displayRecipes(){
    let temp = ''
    for(let i = 0 ; i<container.length; i++){
        temp+=`
        <div id="new-recipes">
                <div class="text">
                    <h3>Name Recipes: ${container[i].namerecipes}</h3>
                    <p>time: ${container[i].time}</p>
                    <p>serves:  ${container[i].serves}</p>
                </div>
                <h4>Descripition Of The Recipes:</h3>
                    <p id="color">${container[i].discripe}</p>
                    <div class="btn">
                        <button onclick = "UpdateData(${i})">Update</button>
                        <button onclick = "deleteData(${i})">Delete</button>
                    </div>
            </div>
        `
    }
    document.getElementById("empty").innerHTML = temp;
}

// Function To Clear Data:

function clearData() {
    namerecipes.value = '';
    serves.value = '';
    time.value = '';
    discripe.value = '';
}

// Function to delete Data:
function deleteData(x){
    container.splice(x,1);
    localStorage.setItem("recipes",JSON.stringify(container));
    displayRecipes()
}


// Function to Update Data:
function UpdateData(i){
    showForm();
    namerecipes.value = container[i].namerecipes;
    serves.value = container[i].serves;
    time.value = container[i].time;
    discripe.value = container[i].discripe;
    add.innerHTML = "Update"
    mood = "update";
    glopal = i;
}

// Function To search Recipes:
function search(){
    var box = "";
    var term = searchValue.value;
    for (let i = 0; i < container.length; i++) {
        if(container[i].namerecipes.toLowerCase().includes(term.toLowerCase())){
            box+=`
            <div id="new-recipes">
                <div class="text">
                    <h3>Name Recipes: ${container[i].namerecipes}</h3>
                    <p>time: ${container[i].time}</p>
                    <p>serves:  ${container[i].serves}</p>
                </div>
                <h4>Descripition Of The Recipes:</h3>
                    <p id="color">${container[i].discripe}</p>
                    <div class="btn">
                        <button onclick = "UpdateData(${i})">Update</button>
                        <button onclick = "deleteData(${i})">Delete</button>
                    </div>
            </div>
            `
        }
        document.getElementById("empty").innerHTML = box;
    }
}
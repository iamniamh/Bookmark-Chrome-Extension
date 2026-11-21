const inputBtn = document.getElementById("input-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el")
const ulEL = document.getElementById("ul-El");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    render(myLeads);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    inputEl.value = "";
});


function render(leads) {
    let listItems = ""
for (let i = 0; i < leads.length; i++) {
    console.log(leads[i])
    listItems += `<li>
    <a target='blank_' href='${leads[i]}'>  
    ${leads[i]} 
    </a>
    </li>`;;}
    ulEL.innerHTML = listItems;
};

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
    
})
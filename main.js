const form=document.getElementById("form");
const textinput=document.getElementById("textInput");
const msg= document.getElementById("msg");
const date=document.getElementById("dateInput");
const textarea=document.getElementById("textarea");
const tasks=document.getElementById("tasks")
const add=document.getElementById("add")

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    formValidation();
});

let formValidation=()=>{
    if(textinput.value===""){
        msg.innerHTML="Task cannot be blank";
        
    }
    else{
        msg.innerHTML="";;
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();
        
        (()=>{
            add.setAttribute("data-bs-dismiss","");
            
        })();
    }
};
let data=[];
let acceptData=()=>{
    data.push({"text":textinput.value,
    "date":date.value,
    "description":textarea.value});
    console.log(data);
    localStorage.setItem("data",JSON.stringify( data));
    createTasks();

}
let createTasks=()=>{
    tasks.innerHTML="";
    data.map((x,y) =>{
        return (tasks.innerHTML+=`
        <div id=${y}>
                    <span class="fw-bold">${x.text}</span>
                    <span class="small date-secondary">${x.date}</span>
                    <p>${x.description}</p>
                    <span class="options">
                        
                        <i onClick="deleteTask(this);createTasks()" title="Delete" class="fa fa-trash" aria-hidden="true"></i>
                        <i onClick="update(this)" title="Edit" data-bs-toggle="modal" data-bs-target="#form" class="fa fa-font" aria-hidden="true"></i>
                    </span>
                </div>
        `);
    });
    
    
  resetForm();
};

let resetForm=()=>{
    textinput.value="";
    date.value="";
    textarea.value="";
};

let deleteTask=(e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem("data",JSON.stringify(data));

    };

let update=(e)=>{
    let selectedTask= e.parentElement.parentElement;
    textinput.value=selectedTask.children[0].innerHTML;
    date.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;
    deleteTask(e);
}

(()=>{
    data=JSON.parse(localStorage.getItem('data')) || [];
    console.log(data);
    createTasks();
    console.log(3);
})();




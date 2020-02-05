window.onload = () => {
    wrapper();
};

function deleteToDo(id) {
    fetch('/api/todos/' + id, {
        method: 'DELETE',
    })
    .then(res => res.text())
    .then(res => {
        res = JSON.parse(res);
        reRenderToDos(res);
    })
}

function postData(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json());
}

function getToDoes() {
    const toDosUrl = `/api/todos`;
    fetch(toDosUrl)
        .then(res => res.json())
        .then(data => {
            reRenderToDos(data)
        })
        .catch(error => console.error(error));
}

function editToDo(id) {
    console.log(id)
    console.log(this)
    let editInputFieldWrapper = document.querySelector(`.edit-wrapper-${id}`);
    let editInputField = document.querySelector(`.edit-wrapper-${id} > input`);
    let saveBtn = document.querySelector(`.edit-wrapper-${id} > button`);
    let editToDoElem = document.querySelector(`span.title-${id}`);
    let editToDoText = editToDoElem.innerHTML.toString();
    console.log(editInputField);
    editInputField.setAttribute("value", `${editToDoText}`);
    editInputFieldWrapper.style.display = "block";
    saveBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let text = editInputField.value;
        console.log(text)
        updateToDo(id, text)
    })

}

function updateToDo(id, text) {
    console.log(id)
    console.log(text)
    const toDosUrl = `/api/todos/${id}`;
    const putMethod = {
        method: 'PUT', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(  {id: id, title:text})
    };

    fetch(toDosUrl, putMethod)
        .then(response => response.json())
        .then(data => {
            let editInputFieldWrapper = document.querySelector(`.edit-wrapper-${data.id}`);
            let editToDoElem = document.querySelector(`span.title-${data.id}`);
            editToDoElem.innerHTML = data.title;
            console.log("wrapp", editInputFieldWrapper)
            editInputFieldWrapper.style.display = "none";
            console.log(data)
        })
        .catch(err => console.log(err))
}

function reRenderToDos(data) {
    console.log(data)
    const todosListWrapper = document.querySelector(".list_wrapper");
    todosListWrapper.innerHTML = "";
    todosListWrapper.innerHTML = li(data);
    const deleteBtnArr = Array.from(document.querySelectorAll(".delete_btn"));
    const editBtnArr = Array.from(document.querySelectorAll(".edit_btn"));
    if (Array.isArray(deleteBtnArr) && deleteBtnArr.length > 0) {
        deleteBtnArr.forEach(el => el.addEventListener("click", function (e) {
            let id = this.getAttribute("data-id");
            deleteToDo(id);
        }))
    }

    if (Array.isArray(editBtnArr) && editBtnArr.length > 0) {
        editBtnArr.forEach(el => el.addEventListener("click", function (e) {
            let id = this.getAttribute("data-id");
            editToDo(id);
        }))
    }
}

function removeToDos() {
    document.getElementById("root").innerHTML = "";
}

const button = (className = "", id = "", value = "Add", toDoId = "") => {
    let btn = document.createElement("button");
    btn.setAttribute("id", `${id}`);
    btn.setAttribute("class", `${className}`);
    btn.setAttribute("value", `${value}`);
    btn.addEventListener("click", function (e) {
        e.preventDefault();
    });
    return btn;
};


const li = (todos = []) => {
    Array.from(todos);
    if (!(Array.isArray(todos) && todos.length)) {

        return (`<li class="list-group-item"> 
                   <span>No todos found</span>
               </li>`)
    } else {
        return `<ul class="list-group">
                ${todos.map(todo => {
            return ` <li class="list-group-item"> 
                            <div>
                                <strong>${todo.id}</strong>
                                <span class="title-${todo.id}">${todo.title}</span>
                                <div class="edit-wrapper-${todo.id}" style="display: none">
                                    <input type="text" class="edit_input" />
                                    <button class="btn save_btn" data-id="${todo.id}">
                                            <img class="icon" src="../../assets/icons/save.svg" alt="save">                
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button class="btn edit_btn" data-id ="${todo.id}">
                                    <img class="icon" src="../../assets/icons/edit.svg" alt="edit">
                                </button>
                                <button class="btn delete_btn" data-id ="${todo.id}">
                                        <img class="icon" src="../../assets/icons/bin.svg" alt="delete">                
                                </button>
                            </div>
                        </li>`
                    })}
            </ul>`
    }
};

const div = (id = "", className = "", children = "") => {
    const div = document.createElement("div");
    div.setAttribute("id", `${id}`);
    div.setAttribute("class", `${className}`);
    div.append(children);
    return div;
};

const inputField = (id = "", type = "text", placeholder = "Add new to do ...") => {
    const input = document.createElement("input");
    input.setAttribute("id", `${id}`);
    input.setAttribute("class", `form-control`);
    input.setAttribute("aria-describedby", `button-addon`);
    input.setAttribute("type", `${type}`);
    input.setAttribute("placeholder", `${placeholder}`);
    return input;
};

function createAddBtn() {
    const btnWrapper = document.createElement("div");
    btnWrapper.setAttribute("class", "input-group-prepend");
    btnWrapper.setAttribute("id", "button-addon");
    const addBtn = document.createElement("button");
    addBtn.setAttribute("id", "add_btn");
    addBtn.setAttribute("class", "btn btn-info");
    addBtn.innerText = "Add";
    addBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let toDo = document.querySelector("#toDoField").value;
        if (toDo.trim().length) {
            postData('/api/todos', {toDo: toDo})
                .then(data => {
                    removeToDos();
                    wrapper();
                    getToDoes();
                    console.log(data)
                })
                .catch(error => console.error(error.message));
        }
    });
    btnWrapper.appendChild(addBtn);
    return btnWrapper;
}

const wrapper = () => {
    const container = document.getElementById("root");
    container.appendChild(div("input_wrapper", "input-group", inputField("toDoField", "text")));
    const inputWrapper = document.getElementById("input_wrapper");
    inputWrapper.appendChild(createAddBtn());
    const listWrapper = document.createElement("div");
    listWrapper.setAttribute("class", "list_wrapper");
    container.append(listWrapper);
    getToDoes();


};





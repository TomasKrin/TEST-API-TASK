const form = document.querySelector(`form`);
const outputCont = document.querySelector(`#outputContainer`);
let person;

form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    fetch(`https://testapi.io/api/tomisss1/resource/Anketa`,
        {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                lastName: event.target.last.value,
                email: event.target.email.value,
                color: event.target.color.value
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((result) => {
            console.log(`POST`, result);
            location.reload();
        })
        .catch(() => {
            console.warn(`POST Fetch Failed`);
        });
});

function drawDiv(name, lastName, email, updated, color, index, id) {
    const div = document.createElement(`div`);
    const p = document.createElement(`p`);
    const p2 = document.createElement(`p`);
    const pName = document.createElement(`p`);
    const pLastName = document.createElement(`p`);
    const pEmail = document.createElement(`p`);
    div.setAttribute(`id`, `${name}`);
    const editBtn = document.createElement(`button`);
    const delBtn = document.createElement(`button`);

    p.textContent = `Person ${name}, favourite color: ${color}`;
    p2.textContent = `Last Updated: ${updated}`;
    pName.textContent = `Name: ${name}`;
    pLastName.textContent = `Last Name: ${lastName}`;
    pEmail.textContent = `Email: ${email}`;
    editBtn.textContent = `Edit`;
    delBtn.textContent = `Delete`;

    div.style.width = `300px`;
    div.style.backgroundColor = color;
    div.style.borderRadius = `5px`;
    div.style.padding = `10px`;
    div.style.margin = `10px`;

    editBtn.style.marginRight = `5px`;
    editBtn.style.color = `white`;
    editBtn.style.backgroundColor = `blue`;
    editBtn.style.borderRadius = `5px`;

    delBtn.style.marginRight = `5px`;
    delBtn.style.color = `white`;
    delBtn.style.backgroundColor = `red`;
    delBtn.style.borderRadius = `5px`;

    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(pName);
    div.appendChild(pLastName);
    div.appendChild(pEmail);
    div.appendChild(editBtn);
    div.appendChild(delBtn);
    outputCont.appendChild(div);

    delBtn.addEventListener(`click`, () => {
        console.log(`deleteID`, id);
        fetch(`https://testapi.io/api/tomisss1/resource/Anketa/${id}`,
            {
                method: `DELETE`,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((result) => {
                console.log(`DEL`, result);
            })
            .catch(() => {
                console.warn(`DELETE Fetch Failed or DELETED`);
                location.reload();
            })
    });

    editBtn.addEventListener(`click`, () => {
        console.log(`editID`, id);
        p.style.display = `none`;
        pName.style.display = `none`;
        pLastName.style.display = `none`;
        pEmail.style.display = `none`;

        const editColor = document.createElement(`input`);
        const editName = document.createElement(`input`);
        const editLastName = document.createElement(`input`);
        const editEmail = document.createElement(`input`);
        const saveEditBtn = document.createElement(`button`);

        saveEditBtn.textContent = `Save Changes`;
        editColor.value = color;
        editName.value = name;
        editLastName.value = lastName;
        editEmail.value = email;

        div.appendChild(editColor);
        div.appendChild(editName);
        div.appendChild(editLastName);
        div.appendChild(editEmail);
        div.appendChild(editBtn);
        div.appendChild(delBtn);

        if (p.style.display = `none`, pName.style.display = `none`, pLastName.style.display = `none`, pEmail.style.display = `none`) {
            editBtn.style.display = `none`;
            delBtn.style.display = `none`;

            saveEditBtn.style.marginRight = `5px`;
            saveEditBtn.style.color = `white`;
            saveEditBtn.style.backgroundColor = `Green`;
            saveEditBtn.style.borderRadius = `5px`;

            div.appendChild(saveEditBtn);

            saveEditBtn.addEventListener(`click`, () => {
                console.log(`clicked`);
                fetch(`https://testapi.io/api/tomisss1/resource/Anketa/${id}`,
                    {
                        method: `PUT`,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: editName.value,
                            lastName: editLastName.value,
                            email: editEmail.value,
                            color: editColor.value
                        })
                    })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                    })
                    .then((result) => {
                        console.log(`PATCH`, result);
                        location.reload();
                    })
                    .catch(() => {
                        console.warn(`PATCH Fetch Failed`);
                    });
            })
        };
    });

};

fetch(`https://testapi.io/api/tomisss1/resource/Anketa`, {
    method: `GET`,
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then((response) => {
        if (response.ok) {
            return response.json()
        }
    })
    .then((data) => {
        person = data.data;
        console.log(`get`, person);
        person.forEach((human, index) => {
            console.log(`human`, human, index);
            drawDiv(human.name, human.lastName, human.email, human.updatedAt, human.color, index, human.id);
        })
    })
    .catch(() => {
        console.warn(`GET Fetch Failed`);
    })


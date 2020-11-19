let mentordata;

//To load mentor data
async function data() {
    let dataraw = await fetch("https://kavin-mentor.herokuapp.com/mentor");
    mentordata = await dataraw.json();
    let table = document.getElementById('mentordata');

    let tbody = document.createElement('tbody');

    mentordata.forEach((val) => {
        let tr = document.createElement('tr');
        let name = document.createElement('td');
        name.innerHTML = val.name;

        let email = document.createElement('td');
        email.innerHTML = val.email;

        let subject = document.createElement('td');
        subject.innerHTML = val.subject;
        
        let deletementor = document.createElement('td');
        deletementor.innerHTML = `<i class="fa fa-trash" style="font-size:24px; color:red" onclick="deleteMentor('${val._id}')"></i>`

        let addstudent = document.createElement('td');
        addstudent.innerHTML = `<i class="fa fa-plus" style="font-size:24px; color:green" onclick="student('${val._id}')"></i>`

        let getstudents = document.createElement('td');
        getstudents.innerHTML = `<i class="fa fa-list" style="font-size:24px; color:blue" onclick="getstudent('${val.name}')"></i>`

      
        tr.append(name, email, subject, deletementor, addstudent, getstudents);
        tbody.append(tr);

    })
    table.append(tbody);
}

data();

//FUnction to add mentor data
async function addmentor() {
    document.getElementById('mentordiv').style.display = 'none'

    let data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
    }

    await fetch('https://kavin-mentor.herokuapp.com/mentor', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'content-Type': "application/json"
        }

    })

    location.reload();
}


async function student(mentorid) {
    document.getElementById('studentform').style.display = "block"
    let mentor = mentordata.find((mentor) => mentor._id == mentorid);
    document.getElementById('mentor').value = mentor.name;
    document.getElementById('studentsubject').value = mentor.subject;
}

//function to post mentor data on form submit
async function addstudent() {
    let data = {
        name: document.getElementById('studentname').value,
        subject: document.getElementById('studentsubject').value,
        mentor: document.getElementById('mentor').value
    }

    await fetch('https://kavin-mentor.herokuapp.com/student', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'content-Type': "application/json"
        }

    })
    document.getElementById('studentform').style.display = 'none'
}

//Delete mentor data
async function deleteMentor(mentorid) {
    try {
        let res = await fetch(`https://kavin-mentor.herokuapp.com/mentor/${mentorid}`, {
            method: "DELETE"
              
        })
        let resdata = await console.log("Mentor details deleted");
        location.reload();

    } catch (err) {
        console.log( err)
    }
}

//Function to get students for particular mentor
async function getstudent(mentorname) {
    try {
        let rawdata = await fetch(`https://kavin-mentor.herokuapp.com/student/${mentorname}`);
        let studentdata = await rawdata.json();

        let ul = document.getElementById('students');
        ul.innerHTML = '';

        studentdata.forEach((student) => {
            let li = document.createElement('li');
            li.innerHTML = student.name;

            ul.append(li);
        });
    } catch (err) {
        console.log(`No student found`)
    }
    document.getElementById('studentdetailsdiv').style.display = (document.getElementById('studentdetailsdiv').style.display === 'block') ? 'none' : 'block';
}

function mentorform() {
    document.getElementById('mentordiv').style.display = "block"
}
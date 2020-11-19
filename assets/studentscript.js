let studentdata;

//Function to get all student details
async function studentData() {
    let data = await fetch("https://kavin-mentor.herokuapp.com/student");
    studentdata = await data.json();
    let table = document.getElementById('studentdata');

    let tbody = document.createElement('tbody');

    studentdata.forEach((val) => {
        let tr = document.createElement('tr');
        let name = document.createElement('td');
        name.innerHTML = val.name;

        let subject = document.createElement('td');
        subject.innerHTML = val.subject;

        let mentor = document.createElement('td');
        mentor.innerHTML = val.mentor;

        let deleteStudent = document.createElement('td');
        deleteStudent.innerHTML =`<button onclick="deleteStudent('${val._id}')">delete</button>`
        tr.append(name, subject, mentor ,deleteStudent);
        tbody.append(tr);
    })

    table.append(tbody);
}
studentData();

//delete student data
async function deleteStudent(mentorid) {
    try {
        let res = await fetch(`https://kavin-mentor.herokuapp.com/student/${mentorid}`, {
            method: "DELETE"
        })
        let resdata = await console.log("Student details deleted");
        location.reload();

    } catch (err) {
        console.log('Issue with connection:' + err)
    }
}
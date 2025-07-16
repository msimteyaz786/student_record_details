let students = JSON.parse(localStorage.getItem('students')) || [];
  let editIndex = -1;

  function renderTable() {
    const tbody = document.querySelector("#recordTable tbody");
    tbody.innerHTML = "";

    students.forEach((student, index) => {
      let row = `<tr>
        <td>${student.name}</td>
        <td>${student.fatherName}</td>
        <td>${student.dob}</td>
        <td>${student.age}</td>
        <td>${student.gender}</td>
        <td>${student.mobile}</td>
        <td>${student.email}</td>
        <td>
          <button class="update" onclick="editRecord(${index})">Update</button>
          <button class="delete" onclick="deleteRecord(${index})">Delete</button>
        </td>
      </tr>`;
      tbody.innerHTML += row;
    });
  }

  document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const student = {
      name: document.getElementById("name").value,
      fatherName: document.getElementById("fatherName").value,
      dob: document.getElementById("dob").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      mobile: document.getElementById("mobile").value,
      email: document.getElementById("email").value,
    };

    if (editIndex === -1) {
      students.push(student);
      alert("✅ Student record saved successfully!");
    } else {
      students[editIndex] = student;
      alert("✏️ Student record updated!");
      editIndex = -1;
    }

    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
    document.getElementById("studentForm").reset();
  });

  function deleteRecord(index) {
    if (confirm("🗑️ Are you sure you want to delete this record?")) {
      students.splice(index, 1);
      localStorage.setItem("students", JSON.stringify(students));
      renderTable();
    }
  }

  function editRecord(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("fatherName").value = student.fatherName;
    document.getElementById("dob").value = student.dob;
    document.getElementById("age").value = student.age;
    document.getElementById("gender").value = student.gender;
    document.getElementById("mobile").value = student.mobile;
    document.getElementById("email").value = student.email;
    editIndex = index;
  }

  renderTable();
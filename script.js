// مصفوفة لتخزين البيانات
let patientData = [];

// وظيفة حفظ البيانات
function saveData() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const date = document.getElementById("date").value;
  const nextVisit = document.getElementById("next-visit").value;

  // بيانات العين اليمنى
  const rightSpherical = document.getElementById("right-spherical").value;
  const rightAstigmatism = document.getElementById("right-astigmatism").value;
  const rightAxis = document.getElementById("right-axis").value;

  // بيانات العين اليسرى
  const leftSpherical = document.getElementById("left-spherical").value;
  const leftAstigmatism = document.getElementById("left-astigmatism").value;
  const leftAxis = document.getElementById("left-axis").value;

  const notes = document.getElementById("notes").value;

  // إضافة البيانات إلى المصفوفة
  patientData.push({ 
    name, age, gender, date, nextVisit, 
    rightSpherical, rightAstigmatism, rightAxis, 
    leftSpherical, leftAstigmatism, leftAxis, 
    notes 
  });

  // تحديث الجدول
  updateTable();

  // إعادة تعيين النموذج
  document.getElementById("eye-form").reset();

  alert("تم حفظ البيانات بنجاح!");
}

// تحديث الجدول بالبيانات
function updateTable() {
  const tableBody = document.getElementById("data-table").querySelector("tbody");
  tableBody.innerHTML = "";

  // ترتيب البيانات أبجديًا حسب الاسم
  const sortedData = patientData.sort((a, b) => a.name.localeCompare(b.name));

  sortedData.forEach(data => {
    const row = 
      <tr>
        <td>${data.name}</td>
        <td>${data.age}</td>
        <td>${data.gender === "male" ? "ذكر" : "أنثى"}</td>
        <td>${data.date}</td>
        <td>${data.rightSpherical}</td>
        <td>${data.rightAstigmatism}</td>
        <td>${data.rightAxis}</td>
        <td>${data.leftSpherical}</td>
        <td>${data.leftAstigmatism}</td>
        <td>${data.leftAxis}</td>
        <td>${data.nextVisit}</td>
        <td>${data.notes}</td>
      </tr>
    ;
    tableBody.insertAdjacentHTML('beforeend', row);
  });
}

// البحث في البيانات
function searchData() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const tableBody = document.getElementById("data-table").querySelector("tbody");
  tableBody.innerHTML = "";

  const filteredData = patientData.filter(data => 
    data.name.toLowerCase().includes(searchInput) || 
    (data.date && data.date.includes(searchInput))
  );

  filteredData.forEach(data => {
    const row = 
      <tr>
        <td>${data.name}</td>
        <td>${data.age}</td>
        <td>${data.gender === "male" ? "ذكر" : "أنثى"}</td>
        <td>${data.date}</td>
        <td>${data.rightSpherical}</td>
        <td>${data.rightAstigmatism}</td>
        <td>${data.rightAxis}</td>
        <td>${data.leftSpherical}</td>
        <td>${data.leftAstigmatism}</td>
        <td>${data.leftAxis}</td>
        <td>${data.nextVisit}</td>
        <td>${data.notes}</td>
      </tr>
    ;
    tableBody.insertAdjacentHTML('beforeend', row);
  });
}

// طباعة الاستمارة
function printForm() {
  window.print();
}

// مشاركة الاستمارة
function shareForm() {
  if (navigator.share) {
    navigator.share({
      title: "استمارة تسجيل بيانات مرضى العيون",
      text: "تفاصيل استمارة مريض العين.",
    })
    .then(() => alert("تمت مشاركة الاستمارة بنجاح!"))
    .catch((error) => alert("تعذر مشاركة الاستمارة: " + error));
  } else {
    alert("المشاركة غير مدعومة في هذا المتصفح.");
  }
}

// تصدير البيانات إلى ملف Excel
function exportToExcel() {
  const ws = XLSX.utils.json_to_sheet(patientData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "البيانات");
  XLSX.writeFile(wb, "بيانات_مرضى_العيون.xlsx");
}
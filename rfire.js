document.addEventListener("DOMContentLoaded", function () {
    // เมื่อหน้าเว็บโหลดเสร็จ
    checkLocalStorage();
});

async function checkLocalStorage() {
    // ตรวจสอบค่า uuid ใน local storage
    var storedUUID = localStorage.getItem("uuid");

    // ถ้าค่า uuid ไม่มีหรือเป็นค่าว่าง
    if (!storedUUID || storedUUID.trim() === "") {
        // ไปหน้า login
        window.location.href = "https://wisanusenhom.github.io/nu/login.html";
    }

    let timerInterval;
    Swal.fire({
      title: "กำลังดาวน์โหลด...",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });

    var userid = localStorage.getItem("userid");
    var username = localStorage.getItem("name");
// เดือนปัจจุบัน
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // เพิ่ม 1 เนื่องจากเดือนเริ่มที่ 0
    month = month < 10 ? '0' + month : month; // ใส่ 0 ด้านหน้าถ้าน้อยกว่า 10
    
    const yyyymm = year.toString() + month.toString();
    console.log(yyyymm);

    
    const xurl = `https://script.google.com/macros/s/AKfycbyB9-NUwszqnFiGghC-avzUS0nglje20_xLgF6_ossLTmEaElHyKHpf1tg-p9bWdLE3XA/exec?user=${userid}&name=${username}`;

    const records = await fetch(xurl);
    const data = await records.json();

    let tab = '';
    data.user.forEach(function (user) {

        tab += `<tr>
        <td>${user.date}</td>
        <td>${user.office}</td>
        <td>${user.fireciful}</td>
        <td>${user.spray}</td>
        <td>${user.force}</td>
        <td>${user.body}</td>
        <td>${user.pressure}</td>
        <td>${user.obstacle}</td>
        <td>${user.details}</td>
        <td>${user.name}</td>
        <td>${user.dupdate}</td>   
        <td>${user.ref}</td>       
           
         </tr>`
    });

    document.getElementById('tbody').innerHTML = tab;
    $('#userTable').DataTable({
        "data": data.user,
        "columns": [
            { "data": 'date' },
            { "data": 'office' },
            { "data": 'fireciful' },
            { "data": 'spray' },
            { "data": 'force' },
            { "data": 'body' },
            { "data": 'pressure' },
            { "data": 'obstacle' },
            { "data": 'details' },
            { "data": 'name' },
            { "data": 'dupdate' },
            { "data": 'ref' }
        ],
        "processing": true,
        "responsive": true,
        "order": [[8, 'asc'], [2, 'asc']],
        "dom": 'lBfrtip',
        "lengthMenu": [[10, 30, 70, 100, 150,200, -1], [10, 30, 70, 100, 150,200, "ทั้งหมด"]],
        "buttons": [
            'excel', 'print',
        ],
        "pageLength": 30,
        "language": {
            "url": 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/th.json'
        },
        "search": {
            "search": yyyymm
        }
    });  

    loadAPI()
}

function loadAPI() {
    // ให้เรียกใช้ API ที่นี่
    // เมื่อโหลดเสร็จแล้วให้ปิด Swal.fire
    Swal.fire({
        icon: "success",
        title: "ดาวน์โหลดสำเร็จ",
        showConfirmButton: false,
        timer: 3000
      });
}

function openWeb() {
  Swal.fire({
      title: 'ยืนยันการดำเนินการ',
      text: 'คลิก "ตกลง" เพื่อเปิดหน้าบันทึกข้อมูล',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
  }).then((result) => {
      if (result.isConfirmed) {
          window.open('fire.html', '_blank');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('การดำเนินการถูกยกเลิก', '', 'info');
      }
  });
}
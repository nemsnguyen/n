<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyASPk6-CSgYO6juWV1pjjQ0pWZ_PzDjwW0",
    authDomain: "dangkylichls.firebaseapp.com",
    projectId: "dangkylichls",
    storageBucket: "dangkylichls.appspot.com",
    messagingSenderId: "301694201338",
    appId: "1:301694201338:web:58b3d1810ac9c4cc9e4843",
    measurementId: "G-R3GZ0EJ2MR"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>


// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Khởi tạo Firestore
const db = firebase.firestore();

// Bước 3: Xử lý form và lưu dữ liệu vào Firestore
document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const bookingDate = document.getElementById("bookingDate").value;
    const time = document.getElementById("time").value;
    const service = document.getElementById("service").value;

    const selectedDate = new Date(bookingDate);
    const dayOfWeek = selectedDate.getUTCDay();
    const holidays = ["2024-01-01", "2024-07-04", "2024-12-25"];

    if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6 || dayOfWeek === 0 || holidays.includes(bookingDate)) {
        alert("Ngày bạn chọn không khả dụng. Vui lòng chọn ngày khác.");
        return;
    }

    // Thêm dữ liệu vào Firestore
    db.collection("appointments").add({
        fullname: fullname,
        phone: phone,
        email: email,
        bookingDate: bookingDate,
        time: time,
        service: service
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById("confirmationMessage").textContent = 
            `Booking confirmed for ${fullname} on ${bookingDate} at ${time} for ${service}.`;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        document.getElementById("confirmationMessage").textContent = 
            "Error confirming booking.";
    });
});









    // Tại đây bạn có thể gợi ý lưu dữ liệu vào Google Sheets hoặc Firebase
    // Dưới đây là một ví dụ sử dụng Google Sheets API:
    /*
    fetch('YOUR_GOOGLE_SCRIPT_URL', {
        method: 'POST',
        body: JSON.stringify({
            fullname: fullname,
            phone: phone,
            email: email,
            bookingDate: bookingDate,
            time: time,
            service: service
        })
    }).then(response => {
        return response.text();
    }).then(data => {
        confirmationMessage.textContent = `Booking confirmed for ${fullname} on ${bookingDate} at ${time} for ${service}.`;
    }).catch(error => {
        console.error('Error:', error);
        confirmationMessage.textContent = 'Error confirming booking.';
    });
    */

 
});


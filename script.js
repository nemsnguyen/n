<script type="module">
  // Import the necessary Firebase functions from the Firebase SDK
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";

  // Firebase configuration object containing keys and identifiers
  const firebaseConfig = {
    apiKey: "AIzaSyASPk6-CSgYO6juWV1pjjQ0pWZ_PzDjwW0",
    authDomain: "dangkylichls.firebaseapp.com",
    projectId: "dangkylichls",
    storageBucket: "dangkylichls.appspot.com",
    messagingSenderId: "301694201338",
    appId: "1:301694201338:web:58b3d1810ac9c4cc9e4843",
    measurementId: "G-R3GZ0EJ2MR"
  };

  // Initialize Firebase and Firestore
  const app = initializeApp(firebaseConfig);  // Khởi tạo ứng dụng Firebase
  const db = getFirestore(app);               // Khởi tạo Firestore database
  const analytics = getAnalytics(app);        // Khởi tạo Firebase Analytics (nếu cần)

  // Function to handle form submission
  document.getElementById("bookingForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Ngăn chặn hành vi submit mặc định của form

    // Lấy dữ liệu từ form
    const fullname = document.getElementById("fullname").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const bookingDate = document.getElementById("bookingDate").value;
    const time = document.getElementById("time").value;
    const service = document.getElementById("service").value;

    // Kiểm tra ngày đặt lịch có hợp lệ hay không
    const selectedDate = new Date(bookingDate);
    const dayOfWeek = selectedDate.getUTCDay();
    const holidays = ["2024-01-01", "2024-07-04", "2024-12-25"]; // Danh sách ngày nghỉ lễ

    if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6 || dayOfWeek === 0 || holidays.includes(bookingDate)) {
      alert("Ngày bạn chọn không khả dụng. Vui lòng chọn ngày khác.");
      return;
    }

    try {
      // Thêm dữ liệu vào Firestore
      const docRef = await db.collection("appointments").add({
        fullname: fullname,
        phone: phone,
        email: email,
        bookingDate: bookingDate,
        time: time,
        service: service
      });
      
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("confirmationMessage").textContent = 
          `Booking confirmed for ${fullname} on ${bookingDate} at ${time} for ${service}.`;

    } catch (error) {
      console.error("Error adding document: ", error);
      document.getElementById("confirmationMessage").textContent = 
          "Error confirming booking.";
    }
  });
</script>



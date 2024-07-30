const bookingForm = document.getElementById('booking-form');
const bookingDateInput = document.getElementById('booking-date');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const fullname = document.getElementById('fullname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const bookingDate = bookingDateInput.value;
  const time = document.getElementById('time').value;
  const service = document.getElementById('service').value;

  // Kiểm tra ngày đặt lịch
  const bookingDateArray = bookingDate.split('-');
  const dayOfWeek = new Date(bookingDateArray[0], bookingDateArray[1] - 1, bookingDateArray[2]).getDay();
  if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6 || dayOfWeek === 0) {
    alert('Không thể đặt lịch vào ngày này');
    return;
  }

  // Gửi dữ liệu đến server
  // ...
});

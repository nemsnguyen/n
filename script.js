document.getElementById('date').addEventListener('input', function() {
    let date = new Date(this.value);
    let day = date.getUTCDay();
    if ([2, 4, 6, 0].includes(day)) {
        alert('Booking is not available on Tuesdays, Thursdays, Saturdays, and Sundays.');
        this.value = '';
    }
});

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let fullname = document.getElementById('fullname').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let service = document.getElementById('service').value;

    fetch('https://script.google.com/macros/s/AKfycbzWIFDYnjB6u8c7h5Y7z-ecQXmt34oy3t_fSEZndfqu/dev', {  // Thay thế YOUR_WEB_APP_URL bằng URL của Web App
        method: 'POST',
        body: JSON.stringify({
            fullname: fullname,
            phone: phone,
            email: email,
            date: date,
            time: time,
            service: service
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            document.getElementById('message').textContent = 'Booking successful!';
            document.getElementById('bookingForm').reset();
        } else {
            document.getElementById('message').textContent = 'Booking failed. Please try again.';
        }
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Booking failed. Please try again.';
    });
});

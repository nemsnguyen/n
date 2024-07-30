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

    fetch('https://script.google.com/macros/s/AKfycbyTiC6uQ58-bQ-o27qya7A3BuSyaVwW77NbFs76zumhfBZoy_RlCZ-0urEvz24Qh-vQqQ/exec', {  // Thay thế YOUR_SCRIPT_ID bằng ID của Web App
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

document.getElementById('scheduleField').addEventListener('input', function(e) {
  const value = this.value;
  if (value) {
    const date = new Date(value);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Check if the selected hours are outside of 9:00 AM to 9:00 PM
    if (hours < 9 || hours > 21 || (hours === 21 && minutes > 0)) {
      alert('You can only select a time between 9:00 AM and 9:00 PM.');
      this.value = ''; // Optionally reset the value
    }
  }
});

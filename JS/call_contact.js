
// This function is used to initiate a phone call when the user clicks on a phone number link


function call_contact (phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
  }
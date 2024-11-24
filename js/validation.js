document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('responsiveForm');
  
  form.addEventListener('submit', function(event) {
    if (!validateForm()) {
      event.preventDefault(); 
    } else {
      storeFormData();
      
      
      if (!localStorage.getItem('previewOpened')) {
        localStorage.setItem('previewOpened', 'true');
        form.target = '_blank'; 
      } else {
        form.target = '_self'; 
      }
    }
  });

  
  const photoInput = document.getElementById('photo');
  photoInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        localStorage.setItem('photo', e.target.result); 
      };
      reader.readAsDataURL(file);
    }
  });
});

function validateForm() {
  let isValid = true;

  
  document.querySelectorAll('.error-message').forEach(function(message) {
    message.textContent = '';
  });
  document.querySelectorAll('.input-with-icon').forEach(function(container) {
    container.classList.remove('error');
  });


  const email = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    email.parentElement.classList.add('error');
    isValid = false;
  }


  const fullName = document.getElementById('full-name');
  const fullNameError = document.getElementById('full-name-error');
  if (fullName.value.trim() === '') {
    fullNameError.textContent = 'Full Name cannot be empty.';
    fullName.parentElement.classList.add('error');
    isValid = false;
  }


  const mobile = document.getElementById('mobile');
  const mobileError = document.getElementById('mobile-error');
  const mobilePattern = /^(\+8801|01)[3-9]\d{8}$/;
  if (!mobilePattern.test(mobile.value)) {
    mobileError.textContent = 'Please enter a valid Bangladeshi mobile number.';
    mobile.parentElement.classList.add('error');
    isValid = false;
  }


  const dob = document.getElementById('dob');
  const dobError = document.getElementById('dob-error');
  if (dob.value === '') {
    dobError.textContent = 'Please enter your date of birth.';
    dob.parentElement.classList.add('error');
    isValid = false;
  }


  const gender = document.getElementById('gender');
  const genderError = document.getElementById('gender-error');
  if (gender.value.trim().toLowerCase() !== 'male' && gender.value.trim().toLowerCase() !== 'female') {
    genderError.textContent = 'Please enter a valid gender (Male/Female).';
    gender.parentElement.classList.add('error');
    isValid = false;
  }


  const photo = document.getElementById('photo');
  const photoError = document.getElementById('photo-error');
  if (photo.files.length === 0) {
    photoError.textContent = 'Please upload your photo.';
    photo.parentElement.classList.add('error');
    isValid = false;
  }

  return isValid;
}

function storeFormData() {
  const email = document.getElementById('email').value;
  const fullName = document.getElementById('full-name').value;
  const mobile = document.getElementById('mobile').value;
  const dob = document.getElementById('dob').value;
  const gender = document.getElementById('gender').value;
  const photo = localStorage.getItem('photo');

  const newEntry = { email, fullName, mobile, dob, gender, photo };


  let userData = JSON.parse(localStorage.getItem('userData')) || [];


  userData.push(newEntry);
  if (userData.length > 10) {
    userData.shift(); 
  }


  localStorage.setItem('userData', JSON.stringify(userData));
}

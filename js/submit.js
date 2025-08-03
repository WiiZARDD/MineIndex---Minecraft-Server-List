document.addEventListener('DOMContentLoaded', () => {
    const flash      = document.getElementById('flash');
    const form       = document.getElementById('server-form');
    const iconInput  = document.getElementById('icon');
    const preview    = document.getElementById('iconPreview');
    const startField = document.getElementById('form_started_at');
  
    if (startField) startField.value = Date.now().toString();
  
    if (new URL(location.href).searchParams.get('ok') === '1') {
      flash.innerHTML = '<p class="success">Submitted! It will appear on the list shortly.</p>';
    }
  
    iconInput.addEventListener('change', () => {
      const file = iconInput.files[0];
      preview.src = file ? URL.createObjectURL(file) : '';
    });
  
    form.addEventListener('submit', () => {
      flash.innerHTML = '';
    });
  });
  
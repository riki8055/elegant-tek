const btnApply = document.querySelector('.btn-apply');
const btnCancel = document.querySelector('.btn-cancel');

btnApply.addEventListener('click', () => {
    document.querySelector('.container').classList.add('show-form')
    document.querySelector('.dark-cover').style.opacity = 1;
    document.querySelector('.dark-cover').style.visibility = 'visible';
})

btnCancel.addEventListener('click', () => {
    document.querySelector('.container').classList.remove('show-form')
    document.querySelector('.dark-cover').style.opacity = 0;
    document.querySelector('.dark-cover').style.visibility = 'hidden';
})
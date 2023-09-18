
const day = document.querySelector('.day');
const month = document.querySelector('.month');
const year = document.querySelector('.year');

const error = document.getElementsByClassName('error');

const calculate = document.getElementById('calculate');


const calculateAge = () => {
    try {
        const birthDay = parseInt(document.getElementById('day').value);
        const birthMonth = parseInt(document.getElementById('month').value);
        const birthYear = parseInt(document.getElementById('year').value);

        const currentDate = new Date();

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        const errorMsg = 'This field is required';
        const invalidMsg = 'Must be a valid date';

        if (isNaN(birthDay) || isNaN(birthMonth) || isNaN(birthYear)) {
            error[0].textContent = errorMsg;
            error[1].textContent = errorMsg;
            error[2].textContent = errorMsg;
            document.getElementById('day').classList.add('red');
            document.getElementById('month').classList.add('red');
            document.getElementById('year').classList.add('red');
            
        }else {
            error[0].textContent = "";
            error[1].textContent = "";
            error[2].textContent = "";

            document.getElementById('day').classList.remove('red');
            document.getElementById('month').classList.remove('red');
            document.getElementById('year').classList.remove('red');

            const isValidDate = validateDate(birthDay, birthMonth, birthYear);
            if(isValidDate){
                let ageYears = currentYear - birthYear;
                let ageMonths = currentMonth - birthMonth;
                let ageDays = currentDay - birthDay;

                if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
                    ageYears--;
                    ageMonths += 12;
                }

                if (ageDays < 0) {
                    const daysInLastMonths = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        0
                    ).getDate();
                    ageMonths--;
                    ageDays += daysInLastMonths;
                }
                return { years: ageYears, months: ageMonths, days: ageDays };
            } else {
                error[0].textContent = invalidMsg;
                error[1].textContent = invalidMsg;
                error[2].textContent = invalidMsg;
            }

        }
    } catch (e) {
        throw new Error('Please check your birth date and try again');
    }
}


calculate.addEventListener('click', () => {
    const age = calculateAge();
    
    year.textContent = age.years;
    month.textContent = age.months
    day.textContent = age.days;
});

calculate.addEventListener('dblclick', () => {
    year.textContent = "--";
    month.textContent = "--";
    day.textContent = "--";


    document.getElementById('day').value = "";
    document.getElementById('month').value = "";
    document.getElementById('year').value = "";
    

});

const validateDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}


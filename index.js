let date_now = new Date();

calculator.addEventListener('click', () => {
    let years = year.value;
    let months = month.value;
    let days = day.value;
    let checkdays = new Date(years, months, 0).getDate();
    let date_user = new Date(years, months - 1, days);
    day_validation.innerHTML = "";
    month_validation.innerHTML = "";
    year_validation.innerHTML = "";
    
    // check blank
    if (days.trim().length === 0) {
        day_validation.innerHTML = "This field is required";
    }
    if (months.trim().length === 0) {
        month_validation.innerHTML = "This field is required";
    }
    if (years.trim().length === 0) {
        year_validation.innerHTML = "This field is required";
    }
    // check number
    if (isNaN(years)) {
        day_validation.innerHTML = "Must be a valid date";
    }
    if (isNaN(months)) {
        month_validation.innerHTML = "Must be a valid month";
    }
    if (isNaN(days)) {
        year_validation.innerHTML = "Must be a valid year";
    }
    //date validation
    if (months == 2) {
        if (leapyear(years)) {
            if (days > 29) {
                day_validation.innerHTML = "Must be a valid date";
            }
        } else {
            if (days > 28) {
                day_validation.innerHTML = "Must be a valid date";
            }
        }
    } else if (days > checkdays) {
        day_validation.innerHTML = "Must be a valid date";
    }
    
    // month validation
    if (months > 12) {
        month_validation.innerHTML = "Must be a valid month";
    }
    // year validation
    if (years > new Date().getFullYear()) {
        year_validation.innerHTML = "Must be a valid year";
    }
    // check all validation
    if (day_validation.innerHTML === "" && month_validation.innerHTML === "" && year_validation.innerHTML === "") {
        inputform.classList.remove("error");
        agecal(date_user, date_now);
    }
    else{
        inputform.classList.add("error");
    }
});

function leapyear(years) {
    return (years % 100 === 0) ? (years % 400 === 0) : (years % 4 === 0);
}

function agecal(date_user, date_now) {
    let daydif = (date_now - date_user) / (1000 * 60 * 60 * 24);
    let daysum = 0;
    let monthsum = 0;
    let year_cal = 0;
    let month_cal = 0;
    let day_cal = 0;
    
    //  find total day between now and birthday to calculate how many years as year_cal and also use to calculate difference in days remain after years
    for (let i = date_user.getFullYear(); i < date_now.getFullYear(); i++) {
        if (leapyear(i)) {
            daysum += 366;
        } else {
            daysum += 365;
        }
        if (daydif - daysum >= 0) {
            year_cal += 1;
        }
    }
    
    // daydif = differ from date now and date user interm of days, so this can be refference on how many months of users age
    // This for the case that month now >= month user then can check dif directly from month user to month now
    // eg. now = April , user = Jan then Jan ===> Apr is 2 months (not count user and now months)
    if (daydif - daysum >= 0) {
        if (date_user.getMonth() <= date_now.getMonth()) {
            // month_cal same algro with year_cal, +2 because I want to check only month between
            for (let i = date_user.getMonth() + 2; i <= date_now.getMonth(); i++) {
                monthsum += new Date(date_now.getFullYear(), i, 0).getDate();
                month_cal += 1;
            }
            // after we get month_cal from for loop (by deduct days in months) we will have remain days of user and now so below logic is for adjusting how many day left and does it over than 30 days
            // if yes then monthl_cal +1
            if (daydif - daysum - monthsum >= 30) {
                day_cal = Math.floor(daydif - daysum - monthsum - 30);
                month_cal += 1;
            } else {
                day_cal = Math.floor(daydif - daysum - monthsum);
            }
        }
    }

    // This for the case that month now < month user then need to + 12 to check year round from month now to month user
    // eg. now = April , user = Sep then Sep ===> Apr is 6 months (not count user and now months)
    else {
        for (let i = date_user.getMonth() + 2; i <= date_now.getMonth() + 12; i++) {
            monthsum += new Date(date_now.getFullYear(), i, 0).getDate();
            month_cal += 1;
        }
        if (daydif - daysum - monthsum + 365 >= 30) {
            day_cal = Math.floor(daydif - daysum - monthsum + 335);
            month_cal += 1;
        } else {
            day_cal = Math.ceil(daydif - daysum - monthsum + 365);
        }
    }
        // display result
            ageY.innerHTML = year_cal;
            ageM.innerHTML = month_cal;
            ageD.innerHTML = day_cal;
}



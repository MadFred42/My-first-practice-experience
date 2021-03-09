window.addEventListener('DOMContentLoaded', () => {

    const dates = ['2022, 1, 1',
            '2021, 12, 25',
            '2022, 3, 8',
            '2022, 2, 14',
        ],
        tabs = document.querySelectorAll('.choose__btns'),
        tabsContent = document.querySelectorAll('.content'),
        tabsParent = document.querySelector('.choose__block'),
        clockContent = document.querySelector('.time__block');

    let timerID; // Global variable to update timer

    function hideTabContent() {          // When function is running every tabs with "hide" class will actually hide)
        tabsContent.forEach(hide => {
            hide.classList.add('hide');
            hide.classList.remove('fade');
        });

        tabs.forEach(item => {
            item.classList.remove('choose__btns__active'); // Remove avctive button class to make it not active
        });


    }

    function showTabContent(i = 0) {                        // Function that makes hidden tabs visible
        tabsContent[i].classList.add('fade');               // i = part number of tab which i'll take from click event.
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('choose__btns__active');
        clockContent.classList.remove('hide');
    }

    tabsParent.addEventListener('click', (event) => {                       
        const target = event.target;     

        if (target && target.classList.contains('choose__btns')) {        // If I'll click on some target and this target will have "choose__btns" class
            tabs.forEach((item, i) => {                                   // then function will look avery tabs whe have with the same class.                      
                if (target == item) {                                     // It means that tareget I'll choose will equal item which have some part number, and this part number will return i
                            
                    hideTabContent();
                    showTabContent(i);
                    changeTimer(i);
                }
            });
        }
        // currentTimeFoo();
    });

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),                 // Here I subtract my chosen date (from array) and current day
              days = Math.floor(t / (1000 * 3600 * 24)),                        // And with this math I'll get how many days left
              hours = Math.floor((t / 1000 / 3600) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {                                                                // Returning results as object
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }



    function getZero(num) {                                                         // Adding 0 to a numbers wich < than 10
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {                              // This function will add results from array with dates to HTML
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');

        clearInterval(timerID);                                 //This method will clear interval when I'll switch between tabs

        timerID = setInterval(updateClock, 1000);               // Set timer for seconds, days etc. to update every 1000 milliseconds

        updateClock();

        function updateClock() {

            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timerID);
            }
        }
    }

    function changeTimer(i) {
        if (!tabsContent[0].classList.contains('hide')) {                       // If tab won't contain "hide" class then function will return date under i part number
            setClock('.time__block', dates[i]);                                 // It seems to me, that function is not realy correct, and it could be improved
        } else if (!tabsContent[1].classList.contains('hide')) {
            setClock('.time__block', dates[i]);
        } else if (!tabsContent[2].classList.contains('hide')) {
            setClock('.time__block', dates[i]);
        } else if (!tabsContent[3].classList.contains('hide')) {
            setClock('.time__block', dates[i]);
        }
    }

    function currentTimeFoo() {                                                             

        const timeOutput = document.querySelector('.output'),
              currentTimerID = setInterval(currentTimeFoo, 1000),
              currentTime = new Date();

        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        timeOutput.innerHTML = (`${getZero(currentTime.getDay())}/${getZero(currentTime.getMonth())}/${getZero(currentTime.getFullYear())}
            ${getZero(currentTime.getHours())}:${getZero(currentTime.getMinutes())}:${getZero(currentTime.getSeconds())}`);
    }

    const btn = document.querySelector('.time__btn');

    btn.addEventListener('click', () => {
        currentTimeFoo();
    });
});
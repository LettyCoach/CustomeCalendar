$(document).ready(function () {
    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月",
        "7月", "8月", "9月", "10月", "11月", "12月"];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
    dayOfWeek1 = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    var entryData = [
        {
            sign: "×",
            course_name: "ブランチコース",
            dept_station: "西武新宿",
            dept_time: "10:40",
            ariv_station: "西武秩父",
            ariv_time: "13:57",
            price: "¥30,000",
            statusClass: "resv_ng"
        },
        {
            sign: "△",
            course_name: "ブランチコース",
            dept_station: "西武新宿",
            dept_time: "10:40",
            ariv_station: "西武秩父",
            ariv_time: "13:57",
            price: "¥30,000",
            statusClass: "resv_few"
        },
        {
            sign: "◎",
            course_name: "ブランチコース",
            dept_station: "西武新宿",
            dept_time: "10:40",
            ariv_station: "西武秩父",
            ariv_time: "13:57",
            price: "¥30,000",
            statusClass: "resv_ok"
        },
        {
            sign: "--",
            course_name: "ブランチコース",
            dept_station: "西武新宿",
            dept_time: "10:40",
            ariv_station: "西武秩父",
            ariv_time: "13:57",
            price: "¥30,000",
            statusClass: "resv_before"
        }
    ]

    var dayinform = [
        { id: 3, entryDataStatus: 0 },
        { id: 4, entryDataStatus: 0 },
        { id: 5, entryDataStatus: 0 },
        { id: 6, entryDataStatus: 0 },
        { id: 11, entryDataStatus: 0 },
        { id: 12, entryDataStatus: 2 },
        { id: 18, entryDataStatus: 0 },
        { id: 19, entryDataStatus: 1 },
        { id: 25, entryDataStatus: 3 },
        { id: 26, entryDataStatus: 0 }
    ]

    // Populate month and year dropdowns



    generateCalendar = (month, year) => {

        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let date = 1, ok = 0;




        $('#calendar_table tbody').empty();
        for (let i = 0; i < 6; i++) {
            if (ok) break;
            let row = $('<tr>');

            for (let j = 0; j < 7; j++) {
                let dayElement = `
                    <td class="resv_col ${dayOfWeek1[(firstDay + date - 1) % 7]}" id="${date}">
                        <div class="cal-sp_date">${month + 1}月${date}日(<span>${dayOfWeek[(firstDay + date - 1) % 7]}</span>)</div>
                        <div class="cal-date">${date}</div>
                        <div class = "detail">
                            <div class="cal-sign"></div>
                            <div class="course-name"></div>
                            <div class="cal-station-box">
                                <div class="dept">
                                    <span class="dept_station"></span>
                                    <span class="dept_time"></span>
                                </div>
                                <div class="ariv">
                                    <span class="ariv_station"></span>
                                    <span class="ariv_time"></span>
                                </div>
                            </div>
                            <div class="cal-price-box" align="center">
                                <span></span>
                            </div>
                        </div>
                    </td>
                `;
                const emptyDay = $('<td>').addClass('no_service');
                for (let k = 0; k < dayinform.length; k++) {
                    if (dayinform[k].id == date) {
                        const no = entryData[dayinform[k].entryDataStatus];
                        dayElement = `
                            <td class="resv_col ${dayOfWeek1[(firstDay + date - 1) % 7]} ${no.statusClass}" id="${date}">
                                <div class="cal-sp_date">${month + 1}月${date}日(<span>${dayOfWeek[(firstDay + date - 1) % 7]}</span>)</div>
                                <div class="cal-date">${date}</div>
                                <div class = "detail">
                                    <div class="cal-sign">${no.sign}</div>
                                    <div class="course-name">${no.course_name}</div>
                                    <div class="cal-station-box arrow_visivle">
                                        <div class="dept">
                                            <span class="dept_station">${no.dept_station}</span>
                                            <span class="dept_time">${no.dept_time}</span>
                                        </div>
                                        <div class="ariv">
                                            <span class="ariv_station">${no.ariv_station}</span>
                                            <span class="ariv_time">${no.ariv_time}</span>
                                        </div>
                                    </div>
                                    <div class="cal-price-box" align="center">
                                        <span>${no.price}</span>
                                    </div>
                                </div>
                            </td>
                        `;
                        break;
                    }
                }

                if (date < today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    const $dayElement = $(dayElement);
                    $dayElement.addClass('past');
                    dayElement = $dayElement[0].outerHTML;
                }

                if ((i === 0 && j < firstDay)) {
                    row.append(emptyDay);
                } else if ((date > daysInMonth || date == daysInMonth) && j == 6) {

                    if (date == daysInMonth) row.append(dayElement);
                    else row.append(emptyDay);
                    ok = 1;
                    break;
                } else if (date > daysInMonth) {
                    row.append(emptyDay);
                } else {
                    row.append(dayElement);
                    date++;
                }
            }

            $('#calendar_table tbody').append(row);
        }
    }

    let changeMonth = currentMonth, chageYear = currentYear, nxtMonth, preMonth, curMonth;
    generateCalendar(currentMonth, currentYear);

    $("#next_month").on("click", () => {

        changeMonth = (changeMonth + 1) % 12;
        curMonth = (changeMonth + 1) % 13;
        nxtMonth = (curMonth + 1) % 12 ? (curMonth + 1) % 12 : 12;
        preMonth = (curMonth - 1) % 12 ? (curMonth - 1) % 12 : 12;
        $('#next_month').val(nxtMonth + "月");
        $('#pre_month').val(preMonth % 13 + "月");
        $('.currentMonth').text(curMonth);
        if (changeMonth == 0) { $('.currentYear').text(++chageYear); }
        var dayinform = 
        $.get()
        generateCalendar(changeMonth, currentYear, aaa);
    });

    $('#pre_month').on('click', () => {
        changeMonth = ((changeMonth - 1) % 12 + 12) % 12;
        curMonth = (changeMonth + 1) % 13;
        nxtMonth = (curMonth + 1) % 12 ? (curMonth + 1) % 12 : 12;
        preMonth = (curMonth - 1) % 12 ? (curMonth - 1) % 12 : 12;
        $('#next_month').val(nxtMonth + "月");
        $('#pre_month').val(preMonth % 13 + "月");
        $('.currentMonth').text(curMonth);
        if (changeMonth == 11) $('.currentYear').text(--chageYear);
        generateCalendar(changeMonth, currentYear);
    });
});

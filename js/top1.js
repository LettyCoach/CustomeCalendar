$(document).ready(function () {
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let changeMonth = currentMonth;
    let changeYear = currentYear;

    // Function to convert dayinform data to FullCalendar events
    function convertDayinformToEvents(dayinform, year, month) {
        return dayinform.map(info => ({
            title: info.course_name,
            start: new Date(year, month, info.day),
            description: `
                <div>${info.sign}</div>
                <div>${info.course_name}</div>
                <div>${info.dept_station} ${info.dept_time}</div>
                <div>${info.ariv_station} ${info.ariv_time}</div>
                <div>${info.price}</div>
            `,
            className: info.statusClass
        }));
    }

    // Initialize FullCalendar
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ja', // Japanese locale
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'today'
        },
        eventRender: function(info) {
            // Customize event rendering
            $(info.el).tooltip({
                title: info.event.extendedProps.description,
                html: true,
                container: 'body'
            });
        },
        events: convertDayinformToEvents(dayinform, currentYear, currentMonth)
    });

    // Render the calendar
    calendar.render();

    
});
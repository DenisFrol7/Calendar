import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import ruLocale from '@fullcalendar/core/locales/ru'
import './styles/style.css'
import axios from "axios";

let calendarEl = document.getElementById('calendar');
let calendar = new Calendar(calendarEl, {
    locale: ruLocale,
    firstDay: 1,
    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
    initialView: 'dayGridMonth',
    headerToolbar: {
        left: 'prev,next today addEventButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek,dayGridDay'
    },
    eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit'
    },
    events: async function (info, successCallback, failureCallback) {
        let events = []
        await axios.get('http://localhost:8080/')
            .then(function (response) {
                let temp = response.data
                for (let i = 0; i < temp.length; i++) {
                    {
                        events.push({
                            title: temp[i].title,
                            start: new Date(Date.parse(temp[i].startEvent)).getTime() + 10800000,
                            end: new Date(Date.parse(temp[i].endEvent)).getTime() + 10800000,
                        })
                    }
                }
            })
            .catch(function (response) {
                console.log(response)
            })
        successCallback(events)
    },
    customButtons: {
        addEventButton: {
            text: 'Добавить событие',
            click: function () {
                const title = prompt('Введите название события');
                const dateStart = prompt('Введите дату начала события в формате YYYY-MM-DD');
                const start = new Date(dateStart); // will be in local time
                const dateEnd = prompt('Введите дату окончания события в формате YYYY-MM-DD');
                const end = new Date(dateEnd); // will be in local time
                console.log(start)
                console.log(end)

                if (!isNaN(start.valueOf())) { // valid?
                    axios.post('http://localhost:8080/', {
                        title: title,
                        startEvent: start,
                        endEvent: end
                    })
                        .then(function (response) {
                            console.log(response)
                        })
                        .catch(function (response) {
                            console.log(response)
                        })
                    calendar.addEvent({
                        title: title,
                        start: start,
                        end: end
                    });
                    alert('Great. Now, update your database...');
                } else {
                    alert('Invalid date.');
                }
            }
        }
    }
});

calendar.render();
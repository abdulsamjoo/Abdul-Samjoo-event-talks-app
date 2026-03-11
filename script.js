document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const searchInput = document.getElementById('search-input');

    const allTalks = talksData.talks;
    let schedule = [];

    function generateSchedule() {
        const startTime = new Date();
        startTime.setHours(10, 0, 0, 0); 
        
        let currentTime = new Date(startTime);

        for (let i = 0; i < allTalks.length; i++) {
            const talk = allTalks[i];
            const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60000);

            schedule.push({
                type: 'talk',
                startTime: new Date(currentTime),
                endTime: talkEndTime,
                ...talk
            });

            currentTime = new Date(talkEndTime);

            if (i === 2) { 
                const lunchEndTime = new Date(currentTime.getTime() + 60 * 60000);
                schedule.push({
                    type: 'break',
                    title: 'Lunch Break',
                    startTime: new Date(currentTime),
                    endTime: lunchEndTime,
                });
                currentTime = lunchEndTime;
            } else if (i < allTalks.length - 1) {
                const breakEndTime = new Date(currentTime.getTime() + 10 * 60000);
                schedule.push({
                    type: 'break',
                    title: 'Transition',
                    startTime: new Date(currentTime),
                    endTime: breakEndTime,
                });
                currentTime = breakEndTime;
            }
        }
    }


    function renderSchedule(filteredSchedule) {
        scheduleContainer.innerHTML = '';
        filteredSchedule.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add(item.type);

            const startTime = item.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const endTime = item.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            if (item.type === 'talk') {
                itemElement.innerHTML = `
                    <div class="talk-time">${startTime} - ${endTime}</div>
                    <div class="talk-title">${item.title}</div>
                    <div class="talk-speakers">${item.speakers.join(', ')}</div>
                    <div class="talk-description">${item.description}</div>
                    <div class="talk-categories">
                        ${item.categories.map(cat => `<span class="talk-category">${cat}</span>`).join('')}
                    </div>
                `;
            } else {
                itemElement.innerHTML = `
                    <div class="talk-time">${startTime} - ${endTime}</div>
                    <div>${item.title}</div>
                `;
            }
            scheduleContainer.appendChild(itemElement);
        });
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTalks = schedule.filter(item => {
            if (item.type === 'break') {
                return true;
            }
            return item.categories.some(cat => cat.toLowerCase().includes(searchTerm));
        });
        renderSchedule(filteredTalks);
    });

    generateSchedule();
    renderSchedule(schedule);
});

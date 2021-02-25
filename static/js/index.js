window.onload = () => {
    let classList = document.body.classList,
        proceedButton = document.querySelector('.proceedButton'), toggle1 = (el) => {
            let btn = el.target.closest('.selectButton') || el.target;
            if (!btn.classList.contains('chosen')) {
                document.querySelectorAll('.selectButton.chosen').forEach(el => el.classList.remove('chosen'))
                btn.closest('.bottom').classList.add('choseTime');
                return btn.classList.add('chosen');
            }
        };

    document.querySelectorAll('.join').forEach(el => el.addEventListener('click', () => {
        if (classList.contains('joining')) return classList.remove('joining');
        classList.add('joining');
        setTimeout(() => window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        }), 200)
    }));

    proceedButton.onmouseover = el => {
        let svg = el.target.querySelector('.proceedButton-arrow .svg'), translate = svg.closest('.proceedButton.joining') ? 'translateY(7px) rotate(90deg)' : 'translateX(7px)';
        svg.animate({
            transform: translate
        }, {
            duration: 500,
            easing: 'ease'
        }).onfinish = () => svg.style.transform = translate;
    };

    proceedButton.onmouseout = el => {
        let svg = el.target.querySelector('.proceedButton-arrow .svg'), translate = svg.closest('.proceedButton.joining') ? 'translateY(0) rotate(90deg)' : 'translate(0)';
        svg.animate({
            transform: translate
        }, {
            duration: 500,
            easing: 'ease'
        }).onfinish = () => svg.style.removeProperty('transform');
    };

    document.querySelectorAll('.selectButton:not(.own)').forEach(e =>
        e.addEventListener('click', el => {
            let data = { time: e.querySelector('.item.time').getAttribute('data-time') }
            fetch('/submit', { method: 'POST', body: JSON.stringify(data) })
                .then(res => res.json())
                .then(res => {
                    if (res.err) return alert(res.err);
                    let bottom = el.target.closest('.bottom'), a = bottom.querySelector('.zoom-link a');
                    a.href = res.link, a.innerText = res.link, bottom.querySelector('.desc2').style.display = 'none';
                    bottom.classList.remove('nothing');
                    bottom.classList.add('chosen');
                }).catch(err => {
                    alert('There was an error, check console for error info');
                    console.log('Error: ', err);
                });
        })
    );
    hour = 12;
    let input = document.querySelector('input[name="custom"]'), own = document.querySelector('.selectButton.bottom-item.own');
    own.querySelector('.steps .step:nth-of-type(2)')

    input.value = `${new Date().toLocaleDateString()} at ${hour.toString().padStart(2, 0)}${hour >= 12 ? 'PM' : 'AM'}`;
    window.dp = TinyDatePicker('input[name="custom"]', {
        // appendTo: document.querySelector('.foo'),
        lang: {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            today: 'Today',
            clear: 'Clear',
            close: 'Close',
        },
        format(date) {
            return `${date.toLocaleDateString()} at ${hour.toString().padStart(2, 0)}${hour >= 12 ? 'PM' : 'AM'}`;
        },
        parse(str) {
            var date = new Date(str);
            own.classList.add('edited');
            // own.querySelector('.steps .step:nth-of-type(2)')
            return isNaN(date) ? new Date() : date;
        },
        mode: window.matchMedia('(max-width: 490px)').matches ? 'dp-modal' : 'dp-below',
        hilightedDate: new Date(),
        min: new Date(),
        // max: '10/1/2020',
        inRange(dt) {
            return dt.getFullYear() % 2 > 0;
        },
        dateClass(dt) {
            return dt.getFullYear() % 2 ? 'odd-date' : 'even-date';
        },
        dayOffset: 1
    })

    dp.on('open', () => {
        document.querySelectorAll('.times span').forEach(e => e.addEventListener('click', el => {
            hour = parseInt(el.target.getAttribute('data-time'));
            document.querySelector('.times span.active').classList.remove('active');
            el.target.classList.add('active');
            input.value = `${input.value.replace(/at.+/, 'at ')}${hour.toString().padStart(2, 0)}${hour >= 12 ? 'PM' : 'AM'}`;
        }));
    });

    document.querySelector('.customSave').addEventListener('click', e => {
        if (!e.target.closest('.showCapacity')) {
            e.target.closest('.edited').classList.add('showCapacity')
        } else {
            checked = document.querySelector('.capacity .inner>div:last-of-type input:checked');
            if (!checked) return alert('Please check a box');
            let date = new Date(document.querySelector('.edited.showCapacity input:first-of-type').value.replace(/^(11)\/(02)\/(2021)\sat\s(12)(AM|PM)$/, '$3-$2-$1T$4:00:00.000Z'));
            if (date.toLocaleString() === "Invalid Date") return alert('Date invalid. Is it altered?');
            console.log(checked)
            fetch('/add', { method: 'POST', body: JSON.stringify({ capacity: parseInt(checked.getAttribute('data-number')) || 0, date: date }) })
                .then(res => res.json())
                .then(res => {
                    let div = e.target.closest('.edited.showCapacity');
                    div.classList.remove('showCapacity');
                    div.classList.remove('edited');
                    div.querySelector('input:first-of-type').remove();
                    div.querySelector('p:first-of-type').innerText = 'Submitted';
                    setTimeout(() => window.location.reload(), 2000);
                }).catch(err => {
                    alert('There was an error, check console for error info');
                    console.log('Error: ', err);
                });
        }
    })

    document.querySelectorAll('.option').forEach(e => e.addEventListener('click', () => {

    }))
}
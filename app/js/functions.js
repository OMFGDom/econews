function getDateTime(datetime) {
    let datetime_created = datetime.split('.');
    let [date, time] = datetime_created[0].split('T');
    let [year, month, day] = date.split('-');
    let [hours, minutes, seconds] = time.split(':');
    let stringDate = `${day}.${month}.${year}`;
    let stringTime = `${hours}:${minutes}`
    return [stringDate, stringTime]
}

function getMonthName(month){
    let value = ''
    switch (month) {
        case '01':
            value =  'января';
            break
        case '02':
            value = 'февраля';
            break
        case '03':
            value = 'марта';
            break
        case '04':
            value = 'апреля';
            break
        case '05':
            value = 'мая';
            break
        case '06':
            value = 'июня';
            break
        case '07':
            value = 'июля';
            break
        case '08':
            value = 'августа';
            break
        case '09':
            value = 'сентября';
            break
        case '10':
            value = 'октября';
            break
        case '11':
            value = 'ноября';
            break
        case '12':
            value = 'декабря';
            break
    }
    return value;
}

function getPublicTypeSvgIcon(number){
    const public_type = {
        1: 'photo',
        2: 'video',
        3: 'chart',
        4: 'hot',
        5: 'adult',
    }
    return `<svg>
                <use xlink:href="/static/img/_src/icons.svg#${public_type[number]}"></use>
            </svg>`
}

function lazyLoadImage() {
    var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

    if ('IntersectionObserver' in window) {
		let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					let lazyImage = entry.target;
					lazyImage.src = lazyImage.dataset.src;
					lazyImage.srcset = lazyImage.dataset.srcset;
					lazyImage.classList.remove('lazy');
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		});
		lazyImages.forEach(function(lazyImage) {
			lazyImageObserver.observe(lazyImage);
		});
	} else {
		lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
			lazyImage.srcset = lazyImage.dataset.srcset;
		});
	}
}
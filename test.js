const t1 = {
    s: new Date('2022-12-05 10:22:12'),
    e: new Date('2022-12-05 11:28:55'),
}

const t2 = {
    s: new Date('2022-12-05 10:30:22'),
    e: new Date('2022-12-05 11:05:26'),
}

const t3 = {
    s: new Date('2022-12-05 10:41:22'),
    e: new Date('2022-12-05 10:48:26'),
}

// t1.e.setSeconds(0);
// t2.s.setSeconds(0);
// t2.e.setSeconds(0);

function getIntersection(...ts) {
    const intervalInSeconds = 60000;

    for(let t of ts) {
        t.s.setSeconds(0);
        t.e.setSeconds(0);

        t.sets = new Set();
        for(let i = t.s.getTime(); i < t.e.getTime(); i += intervalInSeconds) {
            t.sets.add(i);
        }
    }

    const intersects = {};
    for(let j = 0; j < ts.length - 1; j++) {
        for(let i of ts[j].sets) {
            if (ts[j+1].sets.has(i)) {
                if (!intersects[i]) {
                    intersects[i] = 1;
                } else {
                    intersects[i]++;
                }
            }
        }
    }

    const result = [];

    for(let [time, count] of Object.entries(intersects)) {
        if (count === ts.length - 1) {
            result.push(new Date(parseInt(time)));
        }
    }

    return result;
}

const result = getIntersection(t1, t2, t3);

console.log(result);
function intersection(zone1, zone2) {
    var start = Math.max(zone1.start, zone2.start);
    var end = Math.min(zone1.end, zone2.end);
    if (start < end) {
        return {
            start: start,
            end: end
        }
    } else {
        return undefined;
    }
}

function addFreeZone(freeZones, newFreeZone) {
    var i = 0;
    while (i < freeZones.length) {
        var freeZone = freeZones[i];
        if (freeZone.radius <= newFreeZone.radius) {
            i++;
            continue;
        }

        var inter = intersection(freeZone, newFreeZone);
        if (inter === undefined) {
            i++;
            continue;
        }

        if (freeZone.start < inter.start) {
            freeZones[i] = {
                start: freeZone.start,
                end: inter.start,
                radius: freeZone.radius
            };
            i++;
        } else {
            freeZones.splice(i, 1);
        }
        if (i > 0 && freeZones[i - 1].radius === newFreeZone.radius) {
            freeZones[i - 1].end = inter.end;
        } else {
            freeZones.splice(i, 0, {
                start: inter.start,
                end: inter.end,
                radius: newFreeZone.radius
            });
            i++;
        }
        if (inter.end < freeZone.end) {
            freeZones.splice(i, 0, {
                start: inter.end,
                end: freeZone.end,
                radius: freeZone.radius
            });
            i++;
        }
    }
}

function clamp(value, lowerBound, upperBound) {
    if (value < lowerBound) {
        return lowerBound;
    }
    if (value > upperBound) {
        return upperBound;
    }
    return value;
}
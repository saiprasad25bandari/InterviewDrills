import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10,           // number of virtual users
    duration: '30s',   // test duration
};

const BASE_URL = 'http://localhost:4000/api';

export default function () {
    // 1Health check
    let healthRes = http.get(`${BASE_URL}/health`);
    check(healthRes, {
        'health status is 200': (r) => r.status === 200,
    });

    // Get all drills
    let listRes = http.get(`${BASE_URL}/drills`);
    check(listRes, {
        'get drills status is 200': (r) => r.status === 200,
        'drills list is not empty': (r) => r.json().length > 0,
    });

    // Get a single drill by ID (pick first from list if available)
    const drillId = listRes.json()[0]?._id;
    if (drillId) {
        let detailRes = http.get(`${BASE_URL}/drills/${drillId}`);
        check(detailRes, {
            'get drill by id status is 200': (r) => r.status === 200,
        });
    }

    sleep(1); // wait 1 second between iterations
}

import http from 'k6/http';
import { sleep, check, fail } from 'k6';

export const options = {
    vus: 1200, // 1200 virtual users
    duration: '30s', // for 30 seconds
    thresholds: {
        http_req_failed: ['rate<0.1'], // fail if more than 10% requests fail
    },
};

export default function () {
    const res = http.get(__ENV.TESTS_URL);
    sleep(10);
    const success = check(res, {
        'status is 2xx': (r) => r.status >= 200 && r.status < 300,
    });
    if (!success) {
        fail(`Request failed with status ${res.status}`);
    }
}

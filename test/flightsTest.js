// If req.body is empty or null, return message that provide some filters

import { describe, it } from "mocha";
import axios from "axios";
import { TESTING_URL } from "../constants/tests.js";
// import { response } from "express";
import { expect } from "chai";

describe('Flight Query API', () => {
    describe('Body is empty or null error', () => {
        it('should fail with status 400', async () => {
            const result = await axios({
                url: `${TESTING_URL}/flights/search`,
                method: 'post',
                headers: {
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikt5bGUiLCJpYXQiOjE2NjAzNzAwMjh9.wJz0KPu-WpRizV1fYlfC_2uT7h3tDPbQQZPbLUgvdQs',
                    'Content-Type': 'application/json'
                },
                data: {}
            });

            console.log(result);
        });

        it('should pass with status 200', async () => {
            const result = await axios({
                url: `${TESTING_URL}/flights/search`,
                method: 'post',
                headers: {
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikt5bGUiLCJpYXQiOjE2NjAzNzAwMjh9.wJz0KPu-WpRizV1fYlfC_2uT7h3tDPbQQZPbLUgvdQs',
                    'Content-Type': 'application/json'
                },
                data: {
                    name: ['Indigo', 'GoAir']
                }
            });

            console.log(result);
        });
    })
});

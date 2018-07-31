import React from 'react';
import {shallow} from 'enzyme';
import Task from './Task';
import Firebase from 'firebase'

describe("task", () => {
    it("renders without crashing", () => {
        const task = {
            completed: false,
            date: new Firebase.firestore.Timestamp.fromDate(new Date())
        }
        shallow( < Task task={task} />)
    })
})
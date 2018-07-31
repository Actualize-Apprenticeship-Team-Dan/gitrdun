import React from 'react';
import {shallow} from 'enzyme';
import TaskList from './TaskList';

describe("tasklist", () => {
    it("renders without crashing", () => {
        shallow( < TaskList tasks={[]} />)
    })
})
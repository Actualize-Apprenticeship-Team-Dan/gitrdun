import React from 'react';
import {mount} from 'enzyme';
import TaskList from './TaskList';

describe("tasklist", () => {
    it("renders without crashing", () => {
        mount( < TaskList tasks={[]} />)
    })
})
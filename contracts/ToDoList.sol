// SPDX-License-Identifier: MIT
pragma solidity >0.5.16;

contract ToDoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;


    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    constructor() {
        createTask("Check out DPS web page");
    }

    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

}
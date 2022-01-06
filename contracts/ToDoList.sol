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

    event TaskCompleted(
        uint id,
        bool completed
    );
    
    event TransactionDone(
        uint value,
        address payable recipient,
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

    // Takes the tasks, find a specific task and change value
    function taggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }

    function sendEther(address payable _recipient) external {
        _recipient.transfer(1 ether);
        // transfer 1 ether from this smart contract to recipient
        emit TransactionDone(1, _recipient, true);
    }
}
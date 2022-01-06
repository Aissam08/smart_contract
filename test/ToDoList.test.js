const ToDoList = artifacts.require('./ToDoList.sol')

contract('ToDoList', (accounts) => {
	before(async () => {
		this.todolist = await ToDoList.deployed()
	})

	it("deploys successfully", async () =>{
		const address = await this.todolist.address
		// Make sure that the address exists
		assert.notEqual(address, 0x0)
		assert.notEqual(address, '')
		assert.notEqual(address, null)
		assert.notEqual(address, undefined)
	})

	it('list tasks', async() => {
		// Verify task's attribute
		const taskCount = await this.todolist.taskCount()
		const task = await this.todolist.tasks(taskCount)
		assert.equal(task.id.toNumber(), taskCount.toNumber())
		assert.equal(task.content, "Check out DPS web page")
		assert.equal(taskCount.toNumber(), 1)
	})

	it('creates tasks', async() => {
		const result = await this.todolist.createTask('New task')
		const taskCount = await this.todolist.taskCount()
		assert.equal(taskCount.toNumber(), 2)
		console.log(result)
		const event = result.logs[0].args
		assert.equal(event.id.toNumber(), 2)
		assert.equal(event.content, 'New task')
		assert.equal(event.completed, false)
	})

	it('taggles task completion', async() => {
		const result = await this.todolist.taggleCompleted(1)
		const task = await this.todolist.tasks(1)
		assert.equal(task.completed, true)
		const event = result.logs[0].args
		assert.equal(event.id.toNumber(), 1)
		assert.equal(event.completed, true)
	})

	// The transaction needs Web3 to be done
	// it('make transaction', async() => {
	// 	const tr = await this.todolist.sendEther(0x2Ae8280C5E25BBc39b31857bCeB3e51F5eF2EAeD)
	// 	const event = result.logs[0].args
	// 	assert.equal(event.completed, true)
	// })

})
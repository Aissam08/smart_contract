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
})
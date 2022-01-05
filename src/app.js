App = {
  loading: false,
  contracts: {},
	load: async() => {
		// await App.loadWeb3()
		await App.loadAccount()
    await App.loadContract()
    await App.render()
    await App.renderTasks()
	},

  // load blockchain connexion
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.ethereum
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
  	App.account = await ethereum.request({ method: 'eth_accounts' })
  	console.log(App.account)
  },

  loadContract: async () => {
    const todolist = await $.getJSON('ToDoList.json')
    App.contracts.ToDoList = TruffleContract(todolist)
    App.contracts.ToDoList = setProvider(App.web3Provider)
    
    App.ToDoList = await App.contracts.ToDoList.deployed()
    console.log(todolist)
  },

  render: async() => {
    // Avoid double render
    if(App.loading){
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderTasks: async () => {
    // Load total task count from the blockchain
    const taskCount = await App.ToDolist.taskCount()
    const $taskTemplate = $('.taskTemplate')
    
    // Render out each task with a new task template
    for (var i = 1; i <= taskCount; i++) {
      // Fetch the task data from the blockchain (.sol file)
      const task = await App.ToDolist.tasks(i)
      const taskId = task[0].toNumber()
      const taskContent = task[1]
      const taskCompleted = task[2]
    
      // We create an html file for each task
      // clone the previous task and change values
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.content').html(taskContent)
      $newTaskTemplate.find('input')
                            .prop('name', taskId)
                            .prop('checked', taskCompleted)
                            .on('click', App.taggleCompleted)
      // Put the task in the correct list
      if (taskCompleted) {
        $('#completedTaskList').append($newTaskTemplate)
      }else {
        $('#taskList').append($newTaskTemplate)
      }

      // Show the task
      $newTaskTemplate.show()
    }

    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')
      if (boolean){
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }
  },
}

$(() => {
	$(window).load(() => {
		App.load()
	})
})
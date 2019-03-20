$(() => {

  alert("PLEASE PEEK IN THE INFO SECTION FOR ANY KIND OF HELP")

  $("help").click(function()
  {
    alert("THIS IS A TO-DO LIST")
  })

  let inpNewTask = $('#inpNewTask')

  let taskData = []
  if (localStorage.list) {
    taskData = JSON.parse(localStorage.list)
  }

  function refresh() {
    localStorage.list = JSON.stringify(taskData)
    $('#taskList').empty()
    for (let i in taskData) {
      let task = taskData[i]

      $('#taskList').append(
        $('<li>')
        .attr('class', "list-group-item")
        .append(
          $('<div>')
          .attr('class', task.done ? "row done" : "row")
          .attr('id',task.starred ? "Imp" : "notImp")
          .append(
            $('<span>')
            .attr('class', "col py-1")
            .text(task.name)
            .click(function()
            {
            let newTask = $(this).text(prompt("EDIT TASK"))
            //taskData.splice(i,1,newTask.toString());
            })
          )
          .append(
            $('<button>')
            .text("NO DUE DATE")
            .attr('class', "btn btn-secondary")
            .click(function () {
              var dueDate = prompt('Enter Due Date! Format : dd/mm/yyyy');
              dueDate = dueDate.toString()
              arrdueDate = dueDate.split('/')
              if (arrdueDate[1] > 12 || arrdueDate[1] < 1 || arrdueDate[0] > 31 || arrdueDate[0] < 1 || arrdueDate[2].length < 4) {
                  alert('Date is not Valid! Please Enter a Valid Date');
              } else if (arrdueDate[1] % 2 == 0 && arrdueDate[1] != 08 && arrdueDate[0] > 30) {
                  alert('Date is not Valid! Please Enter a Valid Date');
              } else if (arrdueDate[1] == 02 && arrdueDate[2] % 4 != 0 && arrdueDate[0] > 28) {
                  alert('Date is not Valid! Please Enter a Valid Date');
              } else if (arrdueDate[1] == 02 && arrdueDate[0] > 29) {
                  alert('Date is not Valid! Please Enter a Valid Date');
              } else {
                  $(this).text(dueDate);
              }
          })
          )
           .append(
            $('<span>')
            .html('<i class="fas fa-arrow-up"></i>')
            .attr('class', "mx-2")
            .click(function () {
              if(i!==0)
            {taskData.splice(i-1, 0, taskData.splice(i, 1)[0])
              refresh()}
            })
          )
          
          .append(
            $('<span>')
            .html('<i class="fas fa-arrow-down"></i>')
            .attr('class', "mx-2")
            .click(function () {
              if(i!=taskData.length-1)
              {taskData.splice(i+1, 0, taskData.splice(i, 1)[0])
              refresh()}
            })
          )
          .append(
            $('<span>')
            .html(task.done ? '<i class="fas fa-times-circle"></i>' : '<i class="fas fa-check"></i>')
            .attr('class', "mx-2")
            .click(function () {
              task.done = !task.done
              refresh()
            })
          )
          .append(
            $('<span>')
            .html(task.starred ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>')
            .attr('class', "mx-2")
            .click(function () {
              task.starred = !task.starred
              refresh()
            })
          )
          .append(
            $('<span>')
            .html('<i class="fas fa-trash-alt"></i>')
            .attr('class', "mx-2")
            .click(function () {
              taskData.splice(i,1)
              refresh()
            })
          )
        )
      )
    }
  }

  refresh()

  function sortList() {
    taskData.sort(function (a, b) {
      return a.done - b.done
    })
    refresh()
  }

  function clearList() {
    
    let tasksNew = taskData.filter(function (t) {
      return !t.done
    })

    if(tasksNew.length === taskData.length)
    {
      alert("NONE OF THE TASKS HAVE BEEN COMPLETED")
    }
    
    else
    {taskData = taskData.filter(function (t) {
      return !t.done
    })
    refresh()
  }}

  function showFeedback()
  {
     alert("INPUT A VALID TASK TO PROCEED FURTHER")
  }

  function addTask() {
    console.log(taskData)
    let taskName = inpNewTask.val()
    if(inpNewTask.val() === "")
    {
       showFeedback();
    }
    else
    {taskData.push({
      name: taskName,
      done: false,
      starred:false
    })
    inpNewTask.val('')
    refresh()
  }
  }

  $('#Add').click(function () {
    addTask()
  })

  inpNewTask.keyup(function (ev) {
    if (ev.keyCode == 13) {
      addTask()
    }
  })

  $('#Sort').click(function () {
    sortList()
  })

  $('#Clear').click(function () {
    clearList()
  })

  

})

/*var element = tasks[i];
                  tasks.splice(i, 1);
                  tasks.splice(i+1, 0, element);
                  var temp = tasks[i];
                  tasks[i] = tasks[i+1];
                  tasks[i+1] = temp;*/
        

                 
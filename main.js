// + 버튼을 누르면 할 일이 추가된다.

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = [];
let underLine =  document.getElementById("under-line");
let taskTabs = document.querySelectorAll(".task-tabs div");
let mode = "all";
let filterList = [];
let result = false;

taskTabs.forEach(status=>status.addEventListener("click", (e)=>taskTabIndicator(e)));

// 추가버튼 클릭 -> 아이템 추가 / 인풋창 공백으로
addBtn.addEventListener("click", addTask);
addBtn.addEventListener("click", inputClear);

// 아이템 상태 탭 밑줄 이벤트
for(let i=1; i<taskTabs.length; i++){
  taskTabs[i].addEventListener("click", function(event){filter(event)})
}

// 아이템 추가 
function addTask(){
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task);
    render();
    console.log(taskList);
}

// 투두 리스트 그려주기 (렌더링)
function render() {
  let resultHTML = "";
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else {
    list = filterList;
  }
  // 완료한 투두의 경우 (task-done 클래스로 중간줄 효과)
  for(let i=0; i<list.length; i++){
    if (list[i].isComplete) {
      resultHTML += `
      <div class="task">
          <div class="task-done">${list[i].taskContent}
            <div id="text-under-line"></div>
          </div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')">↩️</button>
            <button onclick="deleteTask('${list[i].id}')">❌</button>
          </div>
      </div>
      `;
    // 진행중인 투두의 경우
    } else {
      resultHTML += `
      <div class="task">
          <div>${list[i].taskContent}          
            <div id="text-under-line"></div>
          </div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')">✅</button>
            <button onclick="deleteTask('${list[i].id}')">❌</button>
          </div>
      </div>
      `;
    }
  }

    document.getElementById("task-board").innerHTML = resultHTML;
}

// 투두 완료 <-> 취소 토글
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++){
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete; // 계속해서 반대값을 넣어주게끔
            break;
        }
    }
    render();
}

// 특정 투두 삭제
function deleteTask(id) {    
    result = confirm("정말 삭제하시겠습니까?");
    if (result == true) {
      list = [];
      if (mode == "all") {
        list = taskList;
      } else {
        list = filterList;
      }

      for (let i = 0; i < list.length; i++) {
          if (list[i].id == id) {
              list.splice(i,1);
              list = filterList;
              break; //찾았으면 중간에라도 나오는거 잊지 말기!!
          }
      }
      render();
    } 
}

// 아이템 아이디 값으로 줄 랜덤 문자 생성
function randomIDGenerate(){
    return performance.now().toString(36);
}

// 인풋창 지우기 (엔터, 추가버튼 눌렀을 때)
function inputClear() {
    taskInput.value = "";
}

// 진행 상태별로 탭 나눠서 리스트 나오게 하는 필터
function filter(event){
  mode = event.target.id;
  filterList = [];
  // 모두는 그대로 다 렌더링
  if (mode == "all") {
    render();
  // 진행중은 중간줄 안 그인 것만 새 배열에 넣어서 렌더링
  } else if (mode == "ongoing") {
      for(let i=0; i<taskList.length;i++){
        if(taskList[i].isComplete == false){
          filterList.push(taskList[i]);
        }
      }
      render();
  // 완료는 줄 그인 애들만 새 배열에 넣어서 렌더링
  } else if (mode == "done"){
      for(let i=0; i<taskList.length;i++){
        if(taskList[i].isComplete == true){
          filterList.push(taskList[i]);
        }
      }
      render();
  }
}

// 상태 탭 아래에 밑줄표시 위치 지정
function taskTabIndicator(e){
  underLine.style.left = e.currentTarget.offsetLeft+"px";
  underLine.style.width = e.currentTarget.offsetWidth+"px";
  underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight-4+"px";
}


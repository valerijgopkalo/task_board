<template>
  <View
      :Presenter="presenter"
      :ModalDialogService="modalDialogService"
      :TaskService="taskService"
      :StatusTypeEnum="statusTypeEnum"
  />
</template>

<script>
  import TaskEntity from "@core/entities/task/Task";

  import StatusTypeEnum from "@core/utilites/enum/status/type";

  import ModalDialogService from "@core/services/modalDialog";
  import TaskService from "@core/services/Task";
  import UserService from "@core/services/User";

  import View from "./view";
  import Presenter from "./businessLogic/Presenter";
  import Repository from "./businessLogic/Repository";
  import Model from "./businessLogic/TaskBoadr";

  export default {
    components: {
      View
    },
    data() {
      return {
        modalDialogService: ModalDialogService.getInstance(),
        taskService: TaskService.getInstance(),
        statusTypeEnum: StatusTypeEnum.getInstance(),
        presenter: new Presenter({
          dependencies: {
            Model: new Model({
              dependencies: {
                Repository: new Repository(),
                UserService: UserService.getInstance(),
                TaskEntity
              }
            })
          }
        })
      };
    }
  };
</script>
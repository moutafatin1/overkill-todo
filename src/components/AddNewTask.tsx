import { useState } from "react";
import { InputField } from "./common";
import Button from "./common/elements/Buttons";

type AddNewTaskProps = {
  addNewTask: (task: string) => void;
};

export const AddNewTask = ({ addNewTask }: AddNewTaskProps) => {
  const [taskText, setTaskText] = useState("");
  return (
    <div className="flex items-center gap-2">
      <InputField
        placeholder="new task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <Button
        onClick={() => {
          addNewTask(taskText);
          setTaskText("");
        }}
      >
        Add
      </Button>
    </div>
  );
};

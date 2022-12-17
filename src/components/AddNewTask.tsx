import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { newTaskFormData } from "../schema/task/newTaskSchema";
import { newTaskSchema } from "../schema/task/newTaskSchema";
import { trpc } from "../utils/trpc";
import { InputField } from "./common";
import Button from "./common/elements/Buttons";
// type AddNewTaskProps = {};

export const AddNewTask = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<newTaskFormData>({
    resolver: zodResolver(newTaskSchema),
  });
  const utils = trpc.useContext();
  const addNewTaskMutation = trpc.task.new.useMutation();
  const onSubmit = handleSubmit((data) => {
    addNewTaskMutation.mutate(data, {
      onSuccess: () => {
        utils.task.all.invalidate();
        reset({ text: "" });
      },
    });
  });
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <InputField
        placeholder="new task"
        {...register("text")}
        errorMessage={errors.text?.message}
      />
      <Button>Add</Button>
    </form>
  );
};

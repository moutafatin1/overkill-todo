import type { newTaskFormData } from "../schema/task/newTaskSchema";
import { newTaskSchema } from "../schema/task/newTaskSchema";
import { trpc } from "../utils/trpc";
import { InputField } from "./common";
import Button from "./common/elements/Buttons";
import { Form } from "./common/forms/Form";
// type AddNewTaskProps = {};

export const AddNewTask = () => {
  const utils = trpc.useContext();
  const addNewTaskMutation = trpc.task.new.useMutation();
   
  return (
    <Form<newTaskFormData, typeof newTaskSchema>
      className="flex items-center gap-2"
      schema={newTaskSchema}
      onSubmit={({ text }) => {
        addNewTaskMutation.mutate(
          { text },
          {
            onSuccess: () => {
              utils.task.all.invalidate();
            },
          }
        );
      }}
    >
      {({ register, formState: { errors } }) => (
        <>
          {console.log(errors)}
          <InputField
            placeholder="new task"
            {...register("text")}
            errorMessage={errors.text?.message}
          />

          <Button>Add</Button>
        </>
      )}
    </Form>
  );
};

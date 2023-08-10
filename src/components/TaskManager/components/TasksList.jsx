import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TasksList = ({
  tasks,
  completionHandler,
  deletionHandler,
  dragHandler,
}) => {
  return (
    <DragDropContext onDragEnd={dragHandler}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable
                draggableId={task.id.toString()}
                index={index}
                key={task.id}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      style={{
                        paddingLeft: 50,
                        paddingRight: 50,
                        marginTop: 20,
                        marginLeft: 20,
                        marginRight: 20,
                        border: "1px solid lightgray",
                      }}
                    >
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {task.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {task.desc}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="success"
                          onClick={() => completionHandler(task.id)}
                        >
                          {task.completed ? "Incomplete" : "Complete"}
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => deletionHandler(task.id)}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TasksList;

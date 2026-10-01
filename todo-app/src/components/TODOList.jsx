/* function TODOList() {
    return <ol className="todo_list">{/* <li> list goes here */ /*}</ol>;
} */
import React from "react";

function TODOList({ todos, setTodos }) {
    return (
        <ol className="todo_list">
            {todos && todos.length > 0 ? (
                todos?.map((item, index) => (
                    <Item key={index} item={item} setTodos={setTodos} />
                ))
            ) : (
                <p>Seems lonely in here, what are you up to?</p>
            )}
        </ol>
    );
}

function Item({ item, setTodos }) {
    const [editing, setEditing] = React.useState(false);
    const inputRef = React.useRef(null);
    const completeTodo = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === item.id
                    ? { ...todo, is_completed: !todo.is_completed }
                    : todo
            )
        );
    };
    const handleEdit = () => {
        setEditing(true);
    };
    React.useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            // position the cursor at the end of the text
            inputRef.current.setSelectionRange(
                inputRef.current.value.length,
                inputRef.current.value.length
            );
        }
    }, [editing]);
    const handleInputSubmit = (event) => {
        event.preventDefault();
        setEditing(false);
    };
    const handleInputBlur = () => {
        setEditing(false);
    };
    const handleDelete = () => {
        setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo.id !== item.id)
        );
    };
    const handleInputChange = (e) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === item.id ? { ...todo, title: e.target.value } : todo
            )
        );
    };


    return (
        <li id={item?.id} className="todo_item">
            {editing ? (
                <form className="edit-form" onSubmit={handleInputSubmit}>
                    <label htmlFor="edit-todo">
                        <input
                            ref={inputRef}
                            type="text"
                            name="edit-todo"
                            id="edit-todo"
                            defaultValue={item?.title}
                            onBlur={handleInputBlur}
                            onChange={handleInputChange}
                        />
                    </label>
                </form>
            ) : (
                <>
                    <button className="todo_items_left" onClick={completeTodo}>
                        <svg fill={item.is_completed ? "#22C55E" : "#0d0d0d"}>
                            <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
                        </svg>
                        <p style={item.is_completed ? { textDecoration: "line-through" } : {}}
                        >
                            {item?.title}</p>
                    </button>
                    <div className="todo_items_right">
                        <button type="button" onClick={handleEdit}>
                            <span>Edit</span>
                            <svg>
                                <path d="" />
                            </svg>
                        </button>
                        <button type="button" onClick={handleDelete}>
                            <span>Delete</span>
                            <svg>
                                <path d="" />
                            </svg>
                        </button>
                    </div>
                </>
            )}

        </li>
    );
}

export default TODOList;
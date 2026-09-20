import "./StatusBadge.css"

const statusClasses = {
    "To Do": "status-todo",
    "In Progress": "status-in-progress",
    "Done": "status-done"
};

function StatusBadge({ status }) {
    const className = statusClasses[status] || "status-default";
    return (
        <span className={className}>
            {status}
        </span>
    );
}

export default StatusBadge;
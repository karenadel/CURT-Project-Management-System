import "./PriorityBadge.css"

const priorityClasses = {
    "Low": "priority-low",
    "Medium": "priority-medium",
    "High": "priority-high"
};

function PriorityBadge({ priority }) {
    const className = priorityClasses[priority] || "priority-default";

    return (
        <span className={className}>
            {priority}
        </span>
    );
}

export default PriorityBadge;
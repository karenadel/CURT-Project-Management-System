export const PERMISSIONS = {
    admin: [
        "create_project",
        "edit_project",
        "delete_project",
        "create_task",
        "edit_task",
        "delete_task"
    ],
    member: [
        "create_project",
        "create_task",
        "edit_task"
    ]
};
export function can(user, permission) {
    if (!user) return false;
    return PERMISSIONS[user.role]?.includes(permission) ?? false;
}
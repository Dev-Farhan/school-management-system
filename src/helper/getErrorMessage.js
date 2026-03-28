export const getErrorMessage = (error) => {
    if (error.code === "23505") {
        if (error.message.includes("one_active_session_per_school")) {
            return "It looks like this school already has an active session.";
        }
        return "This record already exists.";
    }
    return "Something went wrong. Please try again.";
};


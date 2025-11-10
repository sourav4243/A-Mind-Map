export const Participants = () => {
    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            List of Users
        </div>
    );
};

Participants.Skeleton = function ParticipantsSkeletoin() {
    return (
        <div className="absolute h-12 w-[100px] top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md"/>
    );
};
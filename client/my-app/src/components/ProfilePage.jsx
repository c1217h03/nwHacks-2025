export default function ProfilePage() {
    const profile = {
        name: "John Doe",
        profilePicture: "../public.avatar1", // Placeholder image
        children: [
            { id: 1, name: "Alice", avatar: "../../public/avatar1.png" },
            { id: 2, name: "Bob", avatar: "../../public/avatar1.png" },
            { id: 3, name: "Charlie", avatar: "../../public/avatar1.png" },
        ],
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img
                    src={profile.profilePicture}
                    alt={`${profile.name}'s Profile`}
                    className="profile-picture"
                />
                <h1>{profile.name}</h1>
            </div>
            <div className="children-list">
                <h2>Children</h2>
                <div className="avatars-container">
                    {profile.children.map((child) => (
                        <div key={child.id} className="child-avatar">
                            <img
                                src={child.avatar}
                                alt={child.name}
                                className="avatar-picture"
                            />
                            <p>{child.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
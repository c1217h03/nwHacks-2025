import Header from "./Header";


export default function ProfilePage() {
    const profile = {
        name: "Jane Doe",
        profilePicture: "../../public/imgs/avatar1.png", // Placeholder image
        children: [
            { id: 1, name: "Alice", avatar: "../../public/imgs//avatar2.png" },
            { id: 2, name: "Bob", avatar: "../../public/imgs/avatar3.png" },
            { id: 3, name: "Charlie", avatar: "../../public/imgs/avatar4.png" },
        ],
    };

    return (
        <div className="profile-parent">
            <div className="profile-page">
                <Header />
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
                            <div className="avatar-container">
                                <div key={child.id} className="child-avatar">
                                    <img
                                        src={child.avatar}
                                        alt={child.name}
                                        className="avatar-picture"
                                    />
                                </div>
                                <p>{child.name}</p>
                                <div />
                            </div>

                        ))}

                    </div>
                </div>
            </div >
        </div>


    );
}
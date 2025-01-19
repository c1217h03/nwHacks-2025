import { Link } from "react-router-dom";
import { HomeIcon, UserRoundIcon, UserCircle, LogOut } from "lucide-react";

export default function Header() {
    return (
        <div className="header-bar">
            <div className="navbar">
                <img src="/logo.jpg" alt="Logo" className="logo" />
                <div className="nav-buttons">
                    <Link to="/home">
                        <button style={{ backgroundColor: 'transparent', borderRadius: '10px', padding: '10px' }}>
                            {/* Home */}
                            <HomeIcon size={24} />
                        </button>
                    </Link>
                    <Link to="/kids">
                        <button style={{ backgroundColor: "transparent", borderColor: '#FFFFFF', borderRadius: '10px', padding: '10px' }}>
                            {/* Kids */}
                            <UserRoundIcon size={24} />
                        </button>
                    </Link>
                    <Link to="/userprofile">
                        <button style={{ backgroundColor: 'transparent', borderRadius: '10px', padding: '10px' }}>
                            <UserCircle size={24} />
                        </button>
                    </Link>
                    <Link to="/">
                        <button style={{ backgroundColor: 'transparent', borderRadius: '10px', padding: '10px' }}>
                            <LogOut size={24}></LogOut>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
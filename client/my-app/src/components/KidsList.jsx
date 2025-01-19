import Kids from "./Kids";

export default function KidsList() {
    return (
        <div class="kids-list">
            <div class="header-bar" style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw' }}>
                <div style={{ marginLeft: 'auto', marginRight: '30px', display: 'flex' }}>
                    <img src="/logo.jpg" alt="Logo" style={{ marginRight: '75vw', width: '50px', height: '50px' }} />
                    <button style={{ margin: '0 10px', padding: '5px 10px' }}>Home</button>
                    <button style={{ margin: '0 10px', padding: '5px 10px' }}>Profile</button>
                    <button style={{ margin: '0 10px', padding: '5px 10px' }}>Logout</button>
                </div>
            </div >

            <div class="kids-list-body">

                <Kids />

            </div>



        </div>
    )
}

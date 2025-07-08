import ItemsSideBar from "./item-side-bar";

const SideBar = () => {
    return (
        <aside className="h-screen w-72 bg-gradient-to-b from-[#648DB3] to-[#3B5C7E] shadow-xl rounded-xl m-4 p-6 flex flex-col">
            <h2 className="text-white text-2xl font-bold mb-8 tracking-wide font-mono">welcome</h2>
            <ItemsSideBar />
        </aside>
    );
}

export default SideBar;
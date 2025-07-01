import ItemsSideBar from "./item-side-bar";

const SideBar = () => {
    return (
        <div className="h-full w-full border-r border-gray-400 flex flex-col">
            <div className="w-full bg-amber-500 px-4 py-2">Logo</div>
            <ItemsSideBar/>
        </div>
    );
}
 
export default SideBar;
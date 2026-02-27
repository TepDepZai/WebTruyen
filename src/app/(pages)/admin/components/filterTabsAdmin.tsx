import React from "react";

interface FilterTab {
  label: string;
  value: string;
  icon?: string;
}

interface FilterTabsAdminProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const FilterTabsAdmin: React.FC<FilterTabsAdminProps> = ({
  activeTab,
  onTabChange,
}) => {
    const filterTabs = [
    { label: "All Users", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Admins", value: "admin" },
    { label: "Authors", value: "author" },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {filterTabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === tab.value
              ? "bg-gradient-to-r from-[#F5C452] to-[#FFD700] text-black shadow-lg shadow-[#F5C452]/50"
              : "bg-[#1B1B23] text-gray-300 border border-[#F5C452]/30 hover:border-[#F5C452]/60 hover:text-[#F5C452]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabsAdmin;

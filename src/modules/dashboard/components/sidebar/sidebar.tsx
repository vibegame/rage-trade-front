"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const navList = [
  {
    key: "account",
    label: "Account",
    icon: <FaUser size={16} />,
    children: [
      { label: "Overview", key: "overview" },
      { label: "Rewards", key: "rewards" },
      { label: "Referrals", key: "referrals" },
      { label: "Deposit", key: "deposit" },
      { label: "Withdraw", key: "withdraw" },
      { label: "Transfer", key: "transfer" },
      { label: "History", key: "history" }
    ]
  }
];

export default function Sidebar() {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(["account"]);
  const [selectedPath, setSelectedPath] = useState<string[]>([
    "account",
    "overview"
  ]);

  const toggleExpandedState = (key: string) => {
    setExpandedKeys(
      expandedKeys.includes(key)
        ? expandedKeys.filter((k) => k !== key)
        : [...expandedKeys, key]
    );
  };

  return (
    <div className="h-full w-[200px] border border-gray-10 bg-gray-12">
      {navList.map((parent, index) => {
        const isActive = !!selectedPath?.includes(parent.key);
        const isExpanded = !!expandedKeys?.includes(parent.key);

        return (
          <div key={index} className="w-full">
            <div
              className={twMerge(
                "flex w-full items-center justify-between cursor-pointer px-4 pt-4 pb-2",
                isActive && "text-purple"
              )}
              onClick={() => {
                toggleExpandedState(parent.key);
              }}
            >
              {parent.icon}
              <div className="ml-2 font-semibold">{parent.label}</div>
              <IoChevronDown
                size={16}
                className="ml-auto text-white"
                style={{
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)"
                }}
              />
            </div>
            {isExpanded && (
              <ul>
                {parent.children.map((child) => {
                  const isActive = !!selectedPath?.includes(child.key);

                  return (
                    <li
                      key={child.key}
                      className={twMerge(
                        "flex h-8 cursor-pointer items-center pl-10 text-sm font-semibold text-gray-5",
                        isActive
                          ? "text-purple bg-gray-11"
                          : "hover:bg-gray-10 hover:text-white"
                      )}
                      onClick={() => {
                        setSelectedPath([parent.key, child.key]);
                      }}
                    >
                      {child.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

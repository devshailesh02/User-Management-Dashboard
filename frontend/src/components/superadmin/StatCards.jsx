import React from "react";
import {
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaBan,
  FaUsers,
} from "react-icons/fa";

import StatCard from "./StatCard";

const StatCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Companies",
      value: stats?.stats._count ?? 0,
      icon: <FaBuilding />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Companies",
      value: stats?.stats.active ?? 0,
      icon: <FaCheckCircle />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Companies",
      value: stats?.stats.pending ?? 0,
      icon: <FaClock />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Suspended Companies",
      value: stats?.stats.suspended ?? 0,
      icon: <FaBan />,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Total Employees",
      value: stats?.employees ?? 0,
      icon: <FaUsers />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          iconBg={card.iconBg}
          iconColor={card.iconColor}
        />
      ))}
    </div>
  );
};

export default StatCards;

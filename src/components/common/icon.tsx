import {
     RiGiftLine,
     RiDashboardLine,
     RiStarLine,
     RiSurveyLine,
     RiUserLine,
     RiMedalLine
} from "@remixicon/react";

interface IconProps {
     name: string;
     color?: string;
     size?: number;
}

const Icon = ({
     name,
     color = "purple",
     size = 22,
}: IconProps) => {
     switch (name) {
          case "RiDashboardLine":
               return <RiDashboardLine color={color} size={size} />;
          case "RiStarLine":
               return <RiStarLine color={color} size={size} />;
          case "RiGiftLine":
               return <RiGiftLine color={color} size={size} />;
          case "RiSurveyLine":
               return <RiSurveyLine color={color} size={size} />;
          case "RiUserLine":
               return <RiUserLine color={color} size={size} />;
          case "RiMedalLine":
               return <RiMedalLine color={color} size={size} />;
          default:
               return <RiGiftLine color={color} size={size} />;
     }
};
export default Icon;

// Path: src/components/common/icon.tsx
// search more icon: https://react-icons-v2.vercel.app/icons/ri
// package: https://www.npmjs.com/package/@remixicon/react in remixicon